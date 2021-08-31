import OSS from 'ali-oss'
import _ from 'lodash'
import axios from '@/utils/axios'
import store from '@/store'
import crypto from '@/utils/crypto'
import numeral from 'numeral'
import CloudError from './CloudError'

const region = import.meta.env.VITE_OSS_REGION
const bucket = import.meta.env.VITE_OSS_BUCKET

export default class Cloud {
  max = 0
  maxText = ''
  client = null

  constructor() {
    this.max = store.getters['glob/setting']('上传最大限制')
    this.maxText = numeral(this.max).format('0 b')
  }

  async getClient() {
    if (this.client) return this.client
    const token = await axios.get('/sts')
    this.client = new OSS({
      region,
      bucket,
      accessKeyId: token.Credentials.AccessKeyId,
      accessKeySecret: token.Credentials.AccessKeySecret,
      stsToken: token.Credentials.SecurityToken
    })
    return this.client
  }

  getUrl(key) {
    return `https://${bucket}.${region}.aliyuncs.com/${key}`
  }

  async list(dir = '', size = 20, marker = null) {
    const client = await this.getClient()
    const result = client.listV2({ prefix: dir, 'max-keys': size, marker })
    result.objects = result.objects || []
    return result
  }

  async upload(file, prefix = '', progress = ({ percent, text }) => {}, options = {}) {
    const data = {
      id: _.uniqueId(),
      name: file.name,
      size: file.size,
      percent: 0,
      text: '等待处理',
      md5: '-',
      url: '',
      mime: file.type,
      error: false
    }

    if (file.size > this.max) {
      const res = {
        ...data,
        percent: 100,
        text: '文件过大',
        error: true
      }
      const e = new CloudError(`文件大小不能超过 ${this.maxText}`, res)
      progress(res)
      throw e
    }

    progress({ ...data, text: '计算MD5' })
    data.md5 = await crypto.md5(file)
    const key = `${prefix}${data.md5}`
    const exists = await this.exists(key)

    if (exists) {
      const res = { ...data, url: this.getUrl(key), duplicated: true, text: '上传完成', percent: 100 }
      progress(res)
      return res
    }

    progress({ ...data, text: '正在上传' })
    let result = { name: '' }
    try {
      if (file.size > 1024 * 1024 * 1) {
        result = await this.putChunked(file, key, {
          ...options,
          progress: (p) =>
            progress({ ...data, percent: parseInt(p * 100), text: parseInt(p * 100) === 100 ? '上传完成' : '正在上传' })
        })
      } else {
        result = await this.put(file, key)
        progress({ ...data, percent: 100, text: '上传完成', url: this.getUrl(result.name) })
      }
      return { ...data, url: this.getUrl(result.name), text: '上传完成', duplicated: false }
    } catch (e) {
      const res = {
        ...data,
        percent: 100,
        text: '上传失败',
        error: true
      }
      progress(res)
      e.result = res
      throw e
    }
  }

  async put(file, path) {
    const client = await this.getClient()
    return await client.put(`${path}`, file)
  }

  async putChunked(file, key, options = {}) {
    console.log(file, key, options)
    const client = await this.getClient()
    return await client.multipartUpload(`${key}`, file, { ...options })
  }

  async delete(paths) {
    const client = await this.getClient()
    return await client.deleteMulti([...paths])
  }

  async exists(key, options = {}) {
    const client = await this.getClient()
    try {
      await client.head(key, options)
      return true
    } catch (e) {
      if (e.code === 'NoSuchKey') {
        return false
      } else {
        throw e
      }
    }
  }
}

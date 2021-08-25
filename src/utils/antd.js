import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default {
  confirm(options) {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '警告',
        content: '该操作将永久删除数据，是否继续？',
        icon: createVNode(ExclamationCircleOutlined),
        okType: 'danger',
        okText: '是',
        cancelText: '否',
        centered: true,
        ...options,
        onOk: () => resolve(),
        onCancel: () => reject()
      })
    })
  }
}

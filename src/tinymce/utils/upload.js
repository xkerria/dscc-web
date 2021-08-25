import Cloud from '@/libs/Cloud'

export default function upload(blob, success, failure) {
  const file = blob.blob()
  const cloud = new Cloud()
  cloud
    .upload(file)
    .then((res) => {
      success(res.url)
    })
    .catch((e) => {
      failure(e.message)
    })
}

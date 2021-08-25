export default {
  getDuration(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const audio = new Audio(url)
      audio.addEventListener('error', function (e) {
        reject(audio.error)
      })
      audio.addEventListener('loadedmetadata', function (e) {
        resolve(Math.round(audio.duration))
      })
    })
  }
}

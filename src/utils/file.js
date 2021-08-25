export default {
  download(url, filename) {
    let a = document.createElement('a')
    a.href = url
    a.download = filename
    a.target = '_blank'
    a.style.display = 'none'
    a.click()
  }
}

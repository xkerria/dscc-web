import SparkMD5 from 'spark-md5'

const md5 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    const blobSlice = File.prototype.webkitSlice || File.prototype.mozSlice || File.prototype.slice
    const chunkSize = 2097152 // read in chunks of 2MB
    const chunks = Math.ceil(file.size / chunkSize)
    const spark = new SparkMD5()

    let currentChunk = 0

    reader.onload = function (e) {
      spark.appendBinary(e.target.result) // append binary string
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    function loadNext() {
      var start = currentChunk * chunkSize
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize

      reader.readAsBinaryString(blobSlice.call(file, start, end))
    }

    loadNext()
  })
}

const crypto = { md5 }

export default crypto

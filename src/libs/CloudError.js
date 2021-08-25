export default class CloudError extends Error {
  constructor(message, result) {
    super(message)
    this.result = result
  }
}

const { successMessages } = require('./success-messages')

class SuccessResponse {
  constructor(message, statusCode, successCode, detail) {
    this.message = message
    this.statusCode = statusCode
    this.successCode = successCode
    this.detail = detail
  }
}

const createSuccessMessage = (code, detail) => {
  const {
    message,
    statusCode,
    successCode,
    detail: messageDetail,
  } = successMessages(code, detail)

  const success = new SuccessResponse(
    message,
    statusCode,
    successCode,
    messageDetail,
  )
  return success
}

module.exports = { createSuccessMessage, SuccessResponse }

const errorMessages = (code, detail) => {
  const messages = {
    1000: {
      message: `İstek inputlarınız eksik lütfen kontrol ediniz.`,
      statusCode: 400,
      errorCode: 1000,
      detail,
    },
    9000: {
      message: `Hay aksi bir şeyler ters gitti.`,
      statusCode: 500,
      errorCode: 9000,
      detail,
    },
  }
  return messages[code]
}

module.exports = {
  errorMessages,
}

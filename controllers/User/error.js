const userErrorMessages = (code, detail) => {
  const messages = {
    1000: {
      message: `İstek inputlarınız eksik lütfen kontrol ediniz.`,
      statusCode: 400,
      errorCode: 1000,
      detail,
    },
    1001: {
      message: `İstek inputlarınız eksik lütfen kontrol ediniz.`,
      statusCode: 400,
      errorCode: 1001,
      detail,
    },
    1100: {
      message: `Kullanıcı ekleme başarısız olmuştur.`,
      statusCode: 400,
      errorCode: 1100,
      detail,
    },
    1101: {
      message: `Proje ekleme başarısız olmuştur.`,
      statusCode: 400,
      errorCode: 1101,
      detail,
    },
    1102: {
      message: `Masraf ekleme başarısız olmuştur.`,
      statusCode: 400,
      errorCode: 1102,
      detail,
    },
    1103: {
      message: `Geçersiz işlem.`,
      statusCode: 400,
      errorCode: 1103,
      detail,
    },
    1104: {
      message: `İşleminiz başarısız olmuştur.`,
      statusCode: 400,
      errorCode: 1104,
      detail,
    },
    1105: {
      message: `Böyle bir kullanıcı bulunamadı.`,
      statusCode: 400,
      errorCode: 1105,
      detail,
    },
    1106: {
      message: `Yanlış veya hatalı şifre girdiniz. Lütfen tekrar deneyiniz.`,
      statusCode: 400,
      errorCode: 1106,
      detail,
    },
    1107: {
      message: `Yanlış şifre girdiniz.`,
      statusCode: 400,
      errorCode: 1107,
      detail,
    },
  }

  return messages[code]
}

module.exports = {
  userErrorMessages,
}

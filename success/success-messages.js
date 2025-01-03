const successMessages = (code, detail) => {
  const messages = {
    2000: {
      message: `Giriş başarılı.`,
      statusCode: 200,
      successCode: 2000,
      detail,
    },
    2001: {
      message: `Toplantı başarıyla kaydedilmiştir.`,
      statusCode: 200,
      successCode: 2001,
      detail,
    },
    2002: {
      message: `Toplantı başarıyla silinmiştir.`,
      statusCode: 200,
      successCode: 2002,
      detail,
    },
    2003: {
      message: `İşleminiz başarı ile gerçekleşmiştir.`,
      statusCode: 200,
      successCode: 2003,
      detail,
    },
    2004: {
      message: `İşlem başarılı.`,
      statusCode: 200,
      successCode: 2004,
      detail,
    },
    2005: {
      message: `Güncelleme başarılı.`,
      statusCode: 200,
      successCode: 2005,
      detail,
    },
    2006: {
      message: `Yeni bildiriminiz yoktur.`,
      statusCode: 200,
      successCode: 2006,
      detail,
    },
    2007: {
      message: `Bildirimleriniz yenilenmiştir.`,
      statusCode: 200,
      successCode: 2007,
      detail,
    },
    2008: {
      message: `Ekleme başarılı.`,
      statusCode: 200,
      successCode: 2008,
      detail,
    },
    2009: {
      message: `Silme işlemi başarılı.`,
      statusCode: 200,
      successCode: 2009,
      detail,
    },
    2010: {
      message: `Kayıt işlemi başarılı.`,
      statusCode: 200,
      successCode: 2010,
      detail,
    },
    2011: {
      message: 'Şifreniz başarıyla güncellendi',
      statusCode: 200,
      successCode: 2011,
      detail,
    },
  }
  return messages[code]
}

module.exports = {
  successMessages,
}

const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const slugify = require('slugify')

// Rastgele dosya adı oluşturma fonksiyonu
function randomname(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

// Multer depolama yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public')
  },
  filename: (req, file, cb) => {
    const randomUniqueName = randomname(10)
    const fileName = path.basename(
      file.originalname,
      path.extname(file.originalname),
    )
    const fileExt = path.extname(file.originalname)
    const cleanedFileName = slugify(fileName, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
    })
    const limitedFileName = cleanedFileName.substring(0, 50)
    const finalFileName = `${randomUniqueName}${limitedFileName}${fileExt}`

    if (!req.imageFileNames) {
      req.imageFileNames = []
    }
    req.imageFileNames.push(finalFileName)

    cb(null, finalFileName)
    console.log('Dosya adı:', finalFileName)
  },
})

// Dosya filtresi
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    console.error('Desteklenmeyen dosya türü:', file.mimetype)
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB'a kadar olan dosyaları kabul et
  },
})

module.exports = {
  upload,
}

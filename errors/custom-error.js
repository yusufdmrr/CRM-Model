const { z } = require('zod')
const { errorMessages } = require('./error-messages')
const { customErrorMessages } = require('../controllers/Customer/error')
const { productErrorMessages } = require('../controllers/Product/error')
const { saleErrorMessages } = require('../controllers/Sale/error')
const { userErrorMessages } = require('../controllers/User/error')

class CustomAPIError extends Error {
  constructor(message, statusCode, customErrorCode, detail) {
    super(message)
    this.statusCode = statusCode
    this.customErrorCode = customErrorCode
    this.detail = detail
  }
}

const databaseActionType = z.enum(['create', 'read', 'update', 'delete'])

const errorRoute = z.enum(['general', 'user', 'custom', 'product', 'sale'])

const createCustomError = (errorCode, route, detail) => {
  let errorRouteType
  if (route === errorRoute.enum.general) {
    errorRouteType = errorMessages(errorCode, detail)
  } else if (route === errorRoute.enum.custom) {
    errorRouteType = customErrorMessages(errorCode, detail)
  } else if (route === errorRoute.enum.product) {
    errorRouteType = productErrorMessages(errorCode, detail)
  } else if (route === errorRoute.enum.sale) {
    errorRouteType = saleErrorMessages(errorCode, detail)
  }else if (route === errorRoute.enum.user) {
    errorRouteType = userErrorMessages(errorCode, detail)
  }
  const {
    message,
    statusCode,
    errorCode: customErrorCode,
    detail: messageDetail,
  } = errorRouteType

  const error = new CustomAPIError(
    message,
    statusCode,
    customErrorCode,
    messageDetail,
  )

  return error
}

module.exports = {
  createCustomError,
  CustomAPIError,
  errorRoute,
  databaseActionType,
}

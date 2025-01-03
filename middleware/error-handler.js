const { CustomAPIError } = require('../errors/custom-error');
const { SuccessResponse } = require('../success/custom-success')
// eslint-disable-next-line no-unused-vars
const handlerMiddleware = (result, req, res, next) => {

  if (result instanceof CustomAPIError) {

    // errorLogSchema.create({
    //   body: req.body,
    //   errorCode: result.customErrorCode,
    //   message: result.message,
    //   detail: result.detail,
    //   originalUrl: req.originalUrl
    // });

    return res
      .status(result.statusCode)
      .json({ msg: result.message, errorCode: result.errorCode, detail: result.detail })
  }
  else if (result instanceof SuccessResponse) {

    // successLogSchema.create({
    //   body: req.body,
    //   succesCode: result.customSuccessCode,
    //   message: result.message,
    //   originalUrl: req.originalUrl
    // });

    return res.status(result.statusCode).json({
      message: result.message,
      successCode: result.customSuccessCode,
      data: result.detail,
    });
  } else {
    
    // errorLogSchema.create({
    //   body: req.body,
    //   errorCode: 500,
    //   message: 'Something went wrong, please try again',
    //   detail: result.detail,
    //   originalUrl: req.originalUrl
    // });

    return res.status(500).json({ msg: 'Something went wrong, please try again' })
  }

}

module.exports = handlerMiddleware

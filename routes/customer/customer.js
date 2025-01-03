const express = require('express')
const router = express.Router()
const {
  inputControllerMiddleware,
} = require('../../middleware/inputController')
const { upload } = require('../../helpers/multer')
const {
  setCustomerInput,
  deleteCustomerInput,
  getCustomerInput,
  updateCustomerInput,
  setAuthorizedPersonInput,
  deleteAuthorizedPersonInput,
  getAuthorizedPersonInput,
} = require('../../controllers/Customer/types')
const {
  setCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  setAuthorizedPerson,
  deleteAuthorizedPerson,
  getAuthorizedPerson,
} = require('../../controllers/Customer/customer')

router
  .route('/setCustomer')
  .post(inputControllerMiddleware(setCustomerInput, setCustomer, 'post', true))
router
  .route('/deleteCustomer')
  .post(
    inputControllerMiddleware(
      deleteCustomerInput,
      deleteCustomer,
      'post',
      true,
    ),
  )
router
  .route('/getCustomer')
  .post(inputControllerMiddleware(getCustomerInput, getCustomer, 'post', true))
router
  .route('/updateCustomer')
  .post(
    inputControllerMiddleware(
      updateCustomerInput,
      updateCustomer,
      'post',
      true,
    ),
  )

router
  .route('/setAuthorizedPerson')
  .post(
    inputControllerMiddleware(
      setAuthorizedPersonInput,
      setAuthorizedPerson,
      'post',
      true,
    ),
  )
router
  .route('/deleteAuthorizedPerson')
  .post(
    inputControllerMiddleware(
      deleteAuthorizedPersonInput,
      deleteAuthorizedPerson,
      'post',
      true,
    ),
  )
router
  .route('/getAuthorizedPerson')
  .post(
    inputControllerMiddleware(
      getAuthorizedPersonInput,
      getAuthorizedPerson,
      'post',
      true,
    ),
  )

module.exports = router

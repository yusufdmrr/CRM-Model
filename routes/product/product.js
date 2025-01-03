const express = require('express')
const router = express.Router()
const {
  inputControllerMiddleware,
} = require('../../middleware/inputController')
const { upload } = require('../../helpers/multer')
const { updateStock } = require('../../helpers/uptadeStockHelpers')
const {
  setProductInput,
  deleteProductInput,
  getProductInput,
  updateProductInput,
  setCategoryInput,
  setCurrencyInput,
  setTaxRateInput,
  setPaymentTypeInput,
  getCurrencyInput,
  getTaxRateInput,
  getPaymentTypeInput,
  deleteCategoryInput,
  deleteCurrencyInput,
  deleteTaxRateInput,
  deletePaymentTypeInput,
  setStockInput,
  deleteStockInput,
  getStockHistoryInput,
} = require('../../controllers/Product/types')
const {
  setProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  setCategory,
  setCurrency,
  setTaxRate,
  setPaymentType,
  getCategory,
  getCurrency,
  getTaxRate,
  getPaymentType,
  deleteCategory,
  deleteCurrency,
  deleteTaxRate,
  deletePaymentType,
  setStock,
  deleteStock,
  getStockHistory,
} = require('../../controllers/Product/product')

router
  .route('/setCategory')
  .post(inputControllerMiddleware(setCategoryInput, setCategory, 'post', true))
router
  .route('/setCurrency')
  .post(inputControllerMiddleware(setCurrencyInput, setCurrency, 'post', true))
router
  .route('/setTaxRate')
  .post(inputControllerMiddleware(setTaxRateInput, setTaxRate, 'post', true))
router
  .route('/setPaymentType')
  .post(
    inputControllerMiddleware(
      setPaymentTypeInput,
      setPaymentType,
      'post',
      true,
    ),
  )

router
  .route('/getCategory')
  .post(inputControllerMiddleware(getProductInput, getCategory, 'post', true))
router
  .route('/getCurrency')
  .post(inputControllerMiddleware(getCurrencyInput, getCurrency, 'post', true))
router
  .route('/getTaxRate')
  .post(inputControllerMiddleware(getTaxRateInput, getTaxRate, 'post', true))
router
  .route('/getPaymentType')
  .post(
    inputControllerMiddleware(
      getPaymentTypeInput,
      getPaymentType,
      'post',
      true,
    ),
  )

router
  .route('/deleteCategory')
  .post(
    inputControllerMiddleware(
      deleteCategoryInput,
      deleteCategory,
      'post',
      true,
    ),
  )
router
  .route('/deleteCurrency')
  .post(
    inputControllerMiddleware(
      deleteCurrencyInput,
      deleteCurrency,
      'post',
      true,
    ),
  )
router
  .route('/deleteTaxRate')
  .post(
    inputControllerMiddleware(deleteTaxRateInput, deleteTaxRate, 'post', true),
  )
router
  .route('/deletePaymentType')
  .post(
    inputControllerMiddleware(
      deletePaymentTypeInput,
      deletePaymentType,
      'post',
      true,
    ),
  )

router
  .route('/setStock')
  .post(inputControllerMiddleware(setStockInput, setStock, 'post', true))
router
  .route('/deleteStock')
  .post(inputControllerMiddleware(deleteStockInput, deleteStock, 'post', true))
router
  .route('/getStockHistory')
  .post(
    inputControllerMiddleware(
      getStockHistoryInput,
      getStockHistory,
      'post',
      true,
    ),
  )
router
  .route('/setProduct')
  .post(inputControllerMiddleware(setProductInput, setProduct, 'post', true))
router
  .route('/deleteProduct')
  .post(
    inputControllerMiddleware(deleteProductInput, deleteProduct, 'post', true),
  )
router
  .route('/getProduct')
  .post(inputControllerMiddleware(getProductInput, getProduct, 'post', true))
router
  .route('/updateProduct')
  .post(
    inputControllerMiddleware(updateProductInput, updateProduct, 'post', true),
  )

module.exports = router

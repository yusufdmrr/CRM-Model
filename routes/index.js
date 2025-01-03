const customerRoutes = require('./customer/customer')
const productRoutes = require('./product/product')
const saleRoutes = require('./sale/sale')
const userRoutes = require('./user/user')


exports.initRoutes = function (app) {
  app.use('/api/v1/crm/customer', customerRoutes)
  app.use('/api/v1/crm/product', productRoutes)
  app.use('/api/v1/crm/sale', saleRoutes)
  app.use('/api/v1/crm/user', userRoutes)
}
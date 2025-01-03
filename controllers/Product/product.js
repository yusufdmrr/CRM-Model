/* eslint-disable no-unused-vars */
const { createCustomError, errorRoute } = require('../../errors/custom-error')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const mongoose = require('mongoose')
const crypto = require('crypto')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const { createSuccessMessage } = require('../../success/custom-success')
const fs = require('fs').promises
const xlsx = require('xlsx')
const { sendEmail } = require('../../helpers/mail')
const { updateStock } = require('../../helpers/uptadeStockHelpers')
const { Customer } = require('../../models/customer')
const { authorizedPerson } = require('../../models/customer')
const { Product } = require('../../models/product')
const { PaymentType } = require('../../models/product')
const { TaxRate } = require('../../models/product')
const { Currency } = require('../../models/product')
const { Category } = require('../../models/product')

const setCategory = async (input, res, next) => {
  try {
    console.log(Category)
    const { name } = input

    const newCategory = new Category({ name })
    const result = await newCategory.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getCategory = async (input, res, next) => {
  try {
    const { categoryId } = input
    const categories = await Category.find()
    return next(createSuccessMessage(2004, categories))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deleteCategory = async (input, res, next) => {
  try {
    const { categoryId } = input

    const result = await Category.findByIdAndDelete(categoryId)

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(
      createSuccessMessage(2004, { message: 'Kategori başarıyla silindi.' }),
    )
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const setCurrency = async (input, res, next) => {
  try {
    const { name } = input

    const newCurrency = new Currency({ name })
    const result = await newCurrency.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getCurrency = async (input, res, next) => {
  try {
    const { currencyId } = input
    const currencies = await Currency.find()
    return next(createSuccessMessage(2004, currencies))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deleteCurrency = async (input, res, next) => {
  try {
    const { currencyId } = input

    const result = await Currency.findByIdAndDelete(currencyId)

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(
      createSuccessMessage(2004, { message: 'Para birimi başarıyla silindi.' }),
    )
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const setTaxRate = async (input, res, next) => {
  try {
    const { name, rate } = input

    const newTaxRate = new TaxRate({ name, rate })
    const result = await newTaxRate.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getTaxRate = async (input, res, next) => {
  try {
    const { taxRateId } = input
    const taxRates = await TaxRate.find()
    return next(createSuccessMessage(2004, taxRates))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deleteTaxRate = async (input, res, next) => {
  try {
    const { taxRateId } = input

    const result = await TaxRate.findByIdAndDelete(taxRateId)

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(
      createSuccessMessage(2004, { message: 'Vergi oranı başarıyla silindi.' }),
    )
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const setPaymentType = async (input, res, next) => {
  try {
    let { name } = input

    const newPaymentType = new PaymentType({ name })
    const result = await newPaymentType.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getPaymentType = async (input, res, next) => {
  try {
    const { paymentTypeId } = input
    const paymentTypes = await PaymentType.find()
    return next(createSuccessMessage(2004, paymentTypes))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deletePaymentType = async (input, res, next) => {
  try {
    const { paymentTypeId } = input

    const result = await PaymentType.findByIdAndDelete(paymentTypeId)

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(
      createSuccessMessage(2004, { message: 'Ödeme türü başarıyla silindi.' }),
    )
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

////////////////////////////////////////////////////////////////////////////
const setProduct = async (input, res, next) => {
  try {
    const {
      productName,
      category,
      description,
      unitPrice,
      currency,
      taxRate,
      stock,
      taxIncluded,
      paymentType,
    } = input

    console.log('taxIncluded', taxIncluded)

    const newProduct = new Product({
      productName,
      category,
      description,
      unitPrice,
      stock,
      currency,
      taxRate,
      taxIncluded,
      paymentType,
    })

    const result = await newProduct.save()

    if (!result) {
      return next(createCustomError(1005, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const deleteProduct = async (input, res, next) => {
  try {
    const { productId } = input

    const result = await Product.findByIdAndUpdate(
      productId,
      { isActive: false, updatedAt: Date.now() },
      { new: true },
    )

    if (!result) {
      return next(createCustomError(1002, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const getProduct = async (input, res, next) => {
  try {
    const { productId } = input
    let result

    if (productId) {
      result = await Product.findOne({ _id: productId })
      if (!result) {
        return next(createCustomError(1002, errorRoute.Enum.product))
      }
    } else {
      result = await Product.find({ isActive: true })
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const updateProduct = async (input, res, next) => {
  try {
    const {
      productId,
      productName,
      category,
      description,
      unitPrice,
      currency,
      taxRate,
      taxIncluded,
      paymentType,
    } = input

    const product = await Product.findById(productId)

    if (!product) {
      return next(createCustomError(1002, errorRoute.Enum.product))
    }

    const updateData = {
      productName,
      category,
      description,
      unitPrice,
      currency,
      taxRate,
      taxIncluded,
      paymentType,
      updatedAt: Date.now(), // Güncelleme zamanı
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    if (!updatedProduct) {
      return next(createCustomError(1002, errorRoute.Enum.product))
    }

    return next(createSuccessMessage(2006, updatedProduct))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const setStock = async (input, res, next) => {
  try {
    const { productId, quantity, type } = input

    const product = await Product.findById(productId)

    if (!product) {
      return next(createCustomError(1002, errorRoute.Enum.action))
    }

    const lastStockAction = product.stockActions[product.stockActions.length - 1];
    let lastNumber = 0;

    if (lastStockAction) {
      lastNumber = lastStockAction.lastNumber + 1;
    }

    const newStockAction = {
      actionId: new mongoose.Types.ObjectId(),
      quantity,
      type,
      createdAt: new Date(),
      lastNumber: lastNumber,
    }

    product.stockActions.push(newStockAction)

    if (type === 'purchase') {
      product.stock += quantity
    } else if (type === 'expense') {
      product.stock -= quantity
    }

    const updatedProduct = await product.save()

    if (!updatedProduct) {
      return next(createCustomError(1002, errorRoute.Enum.action))
    }

    return next(createSuccessMessage(2004, updatedProduct))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000)) 
  }
}

const getStockHistory = async (input, res, next) => {
  const { productId } = input;

  try {
    const product = await Product.findById(productId)
      .populate('category', 'name') 
      .populate('currency', 'name') 
      .populate('taxRate', 'name rate') 
      .populate('paymentType', 'name');

    if (!product) {
      return next(createCustomError(1002, errorRoute.Enum.product));
    }

    const stockHistory = product.stockActions
      .sort((a, b) => {
        if (b.createdAt === a.createdAt) {
          return b.lastNumber - a.lastNumber;
        }
        return b.createdAt - a.createdAt;
      });

    if (!stockHistory || stockHistory.length === 0) {
      return next(createCustomError(1004, errorRoute.Enum.product));
    }

    return res.status(200).json({
      success: true,
      data: stockHistory, 
    });

  } catch (error) {
    console.error(error);
    return next(createCustomError(9000));
  }
}

const deleteStock = async (input, res, next) => {
  try {
    const { productId, quantity } = input

    const product = await Product.findById(productId)
    if (!product) {
      return next(createCustomError(1002, errorRoute.Enum.action))
    }

    const currentStock = product.stock
    if (currentStock < quantity) {
      return next(
        createCustomError(1003, errorRoute.Enum.action, 'Yeterli stok yok'),
      )
    }

    product.stock -= quantity

    product.stockActions.push({
      actionType: 'sale',
      quantity: -quantity,
      actionDate: new Date(),
    })

    const updatedProduct = await product.save()
    if (!updatedProduct) {
      return next(createCustomError(1002, errorRoute.Enum.action))
    }

    return next(createSuccessMessage(2004, updatedProduct))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

module.exports = {
  setProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  setCategory,
  getCategory,
  setCurrency,
  getCurrency,
  setTaxRate,
  getTaxRate,
  setPaymentType,
  getPaymentType,
  deleteCategory,
  deleteCurrency,
  deleteTaxRate,
  deletePaymentType,
  setStock,
  deleteStock,
  getStockHistory,
}

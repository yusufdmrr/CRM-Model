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
const { Sale } = require('../../models/sale')
const { StockAction } = require('../../models/product')

const setSale = async (input, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      customerId,
      saleProducts,
      paymentPlan,
      paymentStatus,
      additionalCostsDescription,
      additionalCostsPrice,
      salePayment,
      netPrice,
      description,
    } = input;

    const processedSaleProducts = [];

    // 1. Satış ürünlerini işleme ve ürün stoklarını güncelleme
    for (let i = 0; i < saleProducts.length; i++) {
      const { productId, quantity, salePrice, costPrice } = saleProducts[i];

      if (!productId || quantity <= 0) {
        return next(createCustomError(1101, errorRoute.Enum.sale));
      }

      const product = await Product.findById(productId);
      if (!product) {
        return next(createCustomError(1102, errorRoute.Enum.sale));
      }

      if (product.stock < quantity) {
        return next(createCustomError(1103, errorRoute.Enum.sale, `Yeterli stok yok. Stokta ${product.stock} adet ${product.productName} mevcut.`));
      }

      product.stock -= quantity;
      await product.save({ session });

      processedSaleProducts.push({
        productId,
        quantity,
        salePrice,
        costPrice,
        totalPrice: quantity * salePrice,
      });
    }

    // 2. Satışı kaydetme
    const newSale = new Sale({
      customerId,
      saleProducts: processedSaleProducts,
      paymentPlan,
      paymentStatus,
      additionalCostsDescription,
      additionalCostsPrice,
      salePayment,
      netPrice,
      description,
    });

    const savedSale = await newSale.save({ session });

    // 3. Stok işlemini kaydetme
    for (let i = 0; i < processedSaleProducts.length; i++) {
      const saleProduct = processedSaleProducts[i];
      const product = await Product.findById(saleProduct.productId);

      const newStockAction = new StockAction({
        actionId: savedSale._id,
        productId: saleProduct.productId,
        quantity: saleProduct.quantity,
        type: 'expense',
        description: `Satış işlemi için ürün çıkışı.`,
      });

      product.stockActions.push(newStockAction);
      await product.save({ session });
    }

    // 4. Müşterinin borcunu güncelleme
    await Customer.findByIdAndUpdate(
      customerId,
      { $inc: { totalDebt: netPrice } }, 
      { session }
    );

    await session.commitTransaction();
    return next(createSuccessMessage(2004, savedSale));

  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return next(createCustomError(9000));
  } finally {
    session.endSession();
  }
}

const deleteSale = async (input, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { saleId } = input;

    const result = await Sale.findByIdAndUpdate(
      saleId,
      { isActive: false, updatedAt: Date.now() },
      { new: true, session }
    );

    if (!result) {
      return next(createCustomError(1102, errorRoute.Enum.sale));
    }

    const saleProducts = result.saleProducts;

    for (let i = 0; i < saleProducts.length; i++) {
      const saleProduct = saleProducts[i];
      const productId = saleProduct.productId;
      const quantityToReturn = saleProduct.quantity;

      const product = await Product.findById(productId);
      if (!product) {
        return next(createCustomError(1103, errorRoute.Enum.sale));
      }

      const stockAction = product.stockActions.find(
        action => action.actionId.toString() === saleId.toString()
      );

      if (!stockAction) {
        console.warn(`Warning: Sale ID ${saleId} için stockAction bulunamadı. Ürün ID: ${productId}`);
        console.log('Mevcut stockActions:', product.stockActions);
        console.log('Aranan saleId:', saleId);
        continue;
      }

      stockAction.isActive = false;
      stockAction.updatedAt = Date.now();

      product.stock += quantityToReturn;
      await product.save({ session });
    }

    await session.commitTransaction();
    return next(createSuccessMessage(2004, result));

  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return next(createCustomError(9000));
  } finally {
    session.endSession();
  }
}

const getSale = async (input, res, next) => {
  try {
    const { saleId } = input
    let result

    if (saleId) {
      result = await Sale.findOne({ _id: saleId })
      if (!result) {
        return next(createCustomError(1002, errorRoute.Enum.sale))
      }
    } else {
      result = await Sale.find({ isActive: true })
    }

    return next(createSuccessMessage(2004, result))
  } catch (error) {
    console.error(error)
    return next(createCustomError(9000))
  }
}

const updateSale = async (input, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      customerId,
      paymentStatus,
      netPrice,
      saleId, // saleId opsiyonel
    } = input;

    // 1. Eğer saleId verilmemişse, customerId'ye ait son aktif satış bulunuyor
    let existingSale;
    if (saleId) {
      existingSale = await Sale.findById(saleId).session(session);
    } else {
      existingSale = await Sale.findOne({
        customerId,
        isActive: true,
      }).sort({ createdAt: -1 }).session(session); // En son aktif satış
    }

    // 2. Eğer satış bulunamadıysa hata ver
    if (!existingSale || !existingSale.isActive) {
      return next(createCustomError(1102, errorRoute.Enum.sale));
    }

    // 3. Sadece ödeme durumu "Tamamlandı" ise müşteri borcunu güncelliyoruz
    if (paymentStatus === 'Tamamlandı') {
      // 4. Müşterinin borcunu güncelleme
      const customer = await Customer.findById(customerId).session(session);
      if (!customer) {
        return next(createCustomError(1104, errorRoute.Enum.sale));
      }

      // Satışın eski net fiyatı ile yeni net fiyatı arasındaki farkı müşteri borcundan ekliyoruz
      const oldNetPrice = existingSale.netPrice;
      customer.totalDebt += (netPrice - oldNetPrice); // Borcu güncelle
      existingSale.netPrice = netPrice; // Satışın yeni net fiyatını kaydet

      await customer.save({ session });
      await existingSale.save({ session });
    }

    await session.commitTransaction();
    return next(createSuccessMessage(2004, existingSale));

  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return next(createCustomError(9000));
  } finally {
    session.endSession();
  }
}

const calculateProfitAndLoss = async (input, res, next) => {
  try {
    const { saleId } = input;

    let sales = [];
    if (saleId) {
      const sale = await Sale.findById(saleId);
      if (!sale) {
        return next(createCustomError(1102, errorRoute.Enum.sale, "Satış bulunamadı."));
      }
      sales.push(sale);
    } else {
      sales = await Sale.find();
      if (!sales || sales.length === 0) {
        return next(createCustomError(1101, errorRoute.Enum.sale, "Hiç satış kaydı bulunamadı."));
      }
    }

    let totalCost = 0;        // Toplam maliyet
    let totalSalePrice = 0;   // Toplam satış tutarı
    let totalProfit = 0;      // Toplam kar/zarar

    for (const sale of sales) {
      for (const saleProduct of sale.saleProducts) {
        const { quantity, salePrice, costPrice } = saleProduct;

        // Satış fiyatını miktar ile çarp
        const totalProductSalePrice = salePrice * quantity;

        // Maliyet zaten toplam olarak geldiği için doğrudan ekle
        const totalProductCostPrice = costPrice;

        // Kar/Zarar hesapla
        const profit = totalProductSalePrice - totalProductCostPrice;

        totalCost += totalProductCostPrice;
        totalSalePrice += totalProductSalePrice;
        totalProfit += profit;
      }
    }

    return next(createSuccessMessage(2004, {
      totalCost,       // Toplam maliyet
      totalSalePrice,  // Toplam satış tutarı
      totalProfit      // Toplam kar/zarar
    }));
  } catch (error) {
    console.error(error);
    return next(createCustomError(9000, errorRoute.Enum.sale));
  }
}

const getCustomerDebt = async (input, res, next) => {
  try {
    const { customerId } = input;
    let result;

    if (customerId) {
      result = await Sale.aggregate([
        { $match: { customerId: mongoose.Types.ObjectId(customerId) } },
        {
          $group: {
            _id: '$customerId',
            totalDebt: { $sum: '$netPrice' },
          },
        },
      ]);
    } else {
      result = await Sale.aggregate([
        {
          $group: {
            _id: '$customerId',
            totalDebt: { $sum: '$netPrice' },
          },
        },
      ]);
    }

    if (result.length === 0) {
      return next(createCustomError(1102, errorRoute.Enum.sale));
    }

    return next(createSuccessMessage(2004, result));
  } catch (error) {
    console.error(error);
    return next(createCustomError(9000));
  }
}

const makePayment = async (input, res, next) => {
  try {
    const { customerId, paymentAmount, paymentMethod } = input;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return next(createCustomError(1102, errorRoute.Enum.sale));
    }

    const totalDebt = customer.totalDebt;

    if (paymentAmount <= 0) {
      return next(createCustomError(1104, errorRoute.Enum.sale));
    }

    if (paymentAmount > totalDebt) {
      return next(createCustomError(1103, errorRoute.Enum.sale));
    }

    const saleRecords = await Sale.find({
      customerId: mongoose.Types.ObjectId(customerId),
      paymentStatus: { $ne: 'Tamamlandı' },
    }).sort({ createdAt: 1 });
    let remainingPayment = paymentAmount;
    for (let sale of saleRecords) {
      const saleDebt = sale.netPrice;

      if (remainingPayment >= saleDebt) {
        sale.netPrice = 0; 
        sale.paymentStatus = 'Tamamlandı'; 
        remainingPayment -= saleDebt; 
      } else {
        sale.netPrice -= remainingPayment; 
        sale.paymentStatus = 'Kısmen Ödendi'; 
        remainingPayment = 0; 
      }

      await sale.save();
    
      if (remainingPayment === 0) break;
    }

    await Customer.findByIdAndUpdate(customerId, {
      $inc: { totalDebt: -paymentAmount },
      $push: {
        paymentHistory: {
          paymentAmount,
          paymentMethod,
          date: new Date(),
        },
      },
    });

    return next(createSuccessMessage(2005, {
      paymentAmount: paymentAmount,
      paymentMethod: paymentMethod,
      remainingDebt: totalDebt - paymentAmount,
    }));
  } catch (error) {
    console.error('Hata:', error);
    return next(createCustomError(9000, errorRoute.Enum.sale));
  }
}

module.exports = {
  setSale,
  deleteSale,
  getSale,
  calculateProfitAndLoss,
  getCustomerDebt,
  makePayment,
  updateSale
}

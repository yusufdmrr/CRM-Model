const { Product } = require('../models/product')

const updateStock = async (productId, quantity, actionType) => {
  try {
    const product = await Product.findById(productId)
    if (!product) {
      throw new Error('Product not found')
    }

    if (actionType === true) {
      product.stock += quantity
    } else if (actionType === false) {
      product.stock -= quantity
    }

    await product.save()
    return product
  } catch (error) {
    throw new Error('Error updating stock')
  }
}

// const updateStock = async (productId, quantity, actionType) => {
//     try {
//         // Ürünü productId'ye göre bul
//         const product = await Product.findById(productId);
//         if (!product) {
//             throw new Error('Product not found'); // Ürün bulunamazsa hata döndür
//         }

//         // Stok güncelleme işlemi
//         if (actionType) { // Ekleme
//             product.stock += quantity; // Mevcut stok üzerine ekleme
//         } else { // Çıkarma
//             product.stock -= quantity; // Mevcut stoktan çıkarma
//         }

//         await product.save(); // Güncellenen ürünü kaydet
//         return product; // Güncellenen ürünü döndür
//     } catch (error) {
//
//         throw new Error('Error updating stock'); // Genel hata döndür
//     }
// };

module.exports = {
  updateStock,
}

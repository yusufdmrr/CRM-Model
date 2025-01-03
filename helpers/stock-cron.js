const cron = require('node-cron');
const { Product } = require('../models/product');
const { sendEmail } = require('./mail');

cron.schedule('0 8 * * *', async () => {
  try {
    console.log('Cron job başladı');
    const lowStockProducts = await Product.find({ stock: { $lt: 51 }, isActive: true });

    if (lowStockProducts.length > 0) {
      for (const product of lowStockProducts) {
        await sendEmail(
          'yusufdemir5899@gmail.com', 
          `Düşük Stok Uyarısı: ${product.productName}`, 
          product.productName, 
          product.stock, 
          null, 
          {
            projectName: 'Stok Yönetimi',
            message: `Ürününüzün stoğu kritik seviyeye düşmüştür.`,
            description: `Ürün: ${product.productName} | Mevcut Stok: ${product.stock}`,
          }
        );
      }
    } else {
      
      const allProducts = await Product.find({ isActive: true });

      const allProductStocks = allProducts
        .map(
          (product) =>
            `<tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${product.productName}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${product.stock}</td>
            </tr>`
        )
        .join('');

      const emailSent = await sendEmail(
        'yusufdemir5899@gmail.com', 
        'Tüm Ürünlerin Stok Bilgileri', 
        null, 
        null, 
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tüm Ürünlerin Stok Bilgileri</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
              color: #333;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 20px 0;
              font-size: 16px;
            }
            th {
              background-color: #f4f4f4;
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            .container {
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 20px;
            }
            .header img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1> Tüm Ürünlerin Stok Bilgileri</h1>
              <img src="https://static3.depositphotos.com/1006434/230/i/600/depositphotos_2305793-stock-photo-warehouse-interior.jpg" alt="Warehouse">
            </div>
            <p>Stok bilgileri aşağıdaki gibidir:</p>
            <table>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Stok Miktarı</th>
                </tr>
              </thead>
              <tbody>
                ${allProductStocks}
              </tbody>
            </table>
          </div>
        </body>
        </html>
        `,
        {
          projectName: 'Stok Yönetimi',
          message: 'Tüm ürünlerin stok bilgileri ektedir.',
          description: 'Stok bilgilerini kontrol edebilirsiniz.',
        }
      );

      // if (emailSent) {
      //   console.log('Tüm ürünlerin stok bilgilerini içeren e-posta başarıyla gönderildi.');
      // } else {
      //   console.error('Tüm ürünlerin stok bilgilerini içeren e-posta gönderimi başarısız.');
      // }
    }
  } catch (error) {
    console.error('Cron job sırasında hata oluştu:', error);
  }
});

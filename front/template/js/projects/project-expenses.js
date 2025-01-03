async function getSale(saleId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/getSale',
      { saleId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Satış bilgilerini alma hatası:', error)
    throw error
  }
}

async function calculateProfitAndLoss(saleId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/calculateProfitAndLoss',
      { saleId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Satış bilgilerini alma hatası:', error)
    throw error
  }
}

async function calculateProfitAndLoss() {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/calculateProfitAndLoss',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Tüm satışlar için kar/zarar hesaplama hatası:', error);
    throw error;
  }
}

async function getCustomer(customerId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/getCustomer',
      { customerId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data.data
  } catch (error) {
    console.error('Müşteri bilgilerini alma hatası:', error)
    throw error
  }
}

async function getProduct(productId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getProduct',
      { productId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data.data
  } catch (error) {
    console.error('Ürün bilgilerini alma hatası:', error)
    throw error
  }
}

async function getUsers(userId) {
  try {
      let response = await axios.post('http://localhost:3001/api/v1/crm/user/getUsers', {userId}, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_TOKEN_HERE'
          }
      });

      return response.data; 
  } catch (error) {
      console.error('Kullanıcı bilgilerini alma hatası:', error);
      throw error; 
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Kullanıcı bilgilerini al
    const userResponse = await getUsers();
    const domm = document.querySelector('#user-name');
    const dommm = document.querySelector('#user-departman');

    if (userResponse?.data?.length > 0) {
      dommm.innerHTML = `${userResponse.data[0].name} ${userResponse.data[0].surname}`;
      domm.innerHTML = userResponse.data[0].role;
    } else {
      console.warn('Kullanıcı bilgisi bulunamadı.');
      dommm.innerHTML = 'Bilinmiyor';
      domm.innerHTML = 'Bilinmiyor';
    }

    // Satış, müşteri ve ürün verilerini al
    const salesData = await getSale();
    const customers = await getCustomer();

    if (!salesData || !salesData.data || !customers) {
      throw new Error('Satış veya müşteri verileri eksik.');
    }

    populateDataTableWithSales(salesData, customers);
    populateSalesDropdown(salesData, customers);

    const profitLossData = createProfitLossSummaryTable(salesData);
    const profitLossChartCanvas = document.getElementById('profit-loss-chart');
    if (profitLossChartCanvas) {
      updateProfitLossChart(profitLossData, profitLossChartCanvas);
    } else {
      console.warn('Grafik elemanı bulunamadı: #profit-loss-chart');
    }

    document.querySelectorAll('.show-details-button').forEach((button) => {
      button.addEventListener('click', function () {
        const saleId = this.dataset.id;
        showSaleDetails(saleId, salesData, customers);
      });
    });

    document.getElementById('getSalesData').addEventListener('click', function () {
      const selectedSaleId = document.getElementById('choices-sales-dropdown').value;

      const selectedSale = salesData.data.find((sale) => sale._id === selectedSaleId);
      if (selectedSale) {
        const saleProfitLossData = createProfitLossSummaryTable({ data: [selectedSale] });
        updateProfitLossChart(saleProfitLossData, profitLossChartCanvas);
      } else {
        const profitLossData = createProfitLossSummaryTable(salesData);
        updateProfitLossChart(profitLossData, profitLossChartCanvas);
      }
    });
  } catch (error) {
    console.error('Hata:', error);
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Veriler yüklenirken bir hata oluştu.',
    });
  }
});

function populateDataTableWithSales(salesData, customers) {
  const salesTableBody = document.getElementById('sales-list-body');
  salesTableBody.innerHTML = '';

  salesData.data.forEach((sale) => {
    const customer = customers.find((c) => c._id === sale.customerId);
    const row = document.createElement('tr');
    const saleDate = new Date(sale.createdAt);
    const formattedDate = saleDate.toLocaleDateString('tr-TR');

    let totalSalePrice = 0;
    let totalCostPrice = 0;

    sale.saleProducts.forEach((product) => {
      const { quantity, salePrice, costPrice } = product;

      totalSalePrice += salePrice * quantity;
      totalCostPrice += costPrice;
    });

    row.innerHTML = `
      <td>${customer ? customer.companyName : 'Bilinmiyor'}</td>
      <td>${totalSalePrice || '0'}</td>
      <td>${totalCostPrice || '0'}</td>
      <td>${totalSalePrice - totalCostPrice || '0'}</td>
      <td>${formattedDate || 'Bilinmiyor'}</td>
      <td>
        <button class="btn btn-info show-details-button" data-id="${sale._id}">
          <i class="fa-solid fa-eye"></i> Detay
        </button>
      </td>
    `;
    salesTableBody.appendChild(row);
  });
}

function populateSalesDropdown(salesData, customers) {
  const salesDropdown = document.getElementById('choices-sales-dropdown');
  salesDropdown.innerHTML = '<option value="">Satış Seçin</option>';

  salesData.data.forEach((sale) => {
    const customer = customers.find((c) => c._id === sale.customerId);
    const saleDate = new Date(sale.createdAt);
    const formattedDate = saleDate.toLocaleDateString('tr-TR');

    const option = document.createElement('option');
    option.value = sale._id;
    option.textContent = `${customer ? customer.companyName : 'Bilinmiyor'} - ${formattedDate}`;
    salesDropdown.appendChild(option);
  });
}

function createProfitLossSummaryTable(salesData) {
  const profitLossSummaryBody = document.getElementById('profit-loss-summary-body');
  profitLossSummaryBody.innerHTML = '';

  let totalSales = 0;
  let totalCosts = 0;

  salesData.data.forEach((sale) => {
    sale.saleProducts.forEach((product) => {
      const { quantity, salePrice, costPrice } = product;

      totalSales += salePrice * quantity;
      totalCosts += costPrice;
    });
  });

  const totalProfit = totalSales - totalCosts;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${totalSales || '0'}</td>
    <td>${totalCosts || '0'}</td>
    <td>${totalProfit || '0'}</td>
  `;
  profitLossSummaryBody.appendChild(row);

  return { totalSales, totalCosts, totalProfit };
}

function updateProfitLossChart(data, canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas bağlamı alınamadı.');
    return;
  }

  if (canvas.chart) {
    canvas.chart.destroy();
  }

  canvas.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Toplam Satış', 'Toplam Maliyet', 'Toplam Kar/Zarar'],
      datasets: [
        {
          label: 'Değerler',
          data: [data.totalSales, -data.totalCosts, data.totalProfit],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Veri Türü',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Değer (TL)',
          },
        },
      },
    },
  });
}

// document.addEventListener('DOMContentLoaded', async function () {
//   try {
      
//     const salesData = await getSale();
//     const customers = await getCustomer();
//     let chartInstance = null;

//     const domm = document.querySelector('#user-name')
//     const dommm = document.querySelector('#user-departman')

//     dommm.innerHTML = res.data[0].name + ' ' + res.data[0].surname
//     domm.innerHTML= res.data[0].role


//     if (!salesData || !salesData.data || !customers) {
//       throw new Error("Satış veya müşteri verileri eksik.");
//     }

//     populateDataTableWithSales(salesData, customers);
//     populateSalesDropdown(salesData, customers); 

//     const profitLossData = createProfitLossSummaryTable(salesData);
//     const profitLossChartCanvas = document.getElementById('profit-loss-chart');
//     if (profitLossChartCanvas) {
//       updateProfitLossChart(profitLossData, profitLossChartCanvas);
//     } else {
//       console.warn("Grafik elemanı bulunamadı: #profit-loss-chart");
//     }

//     document.querySelectorAll('.show-details-button').forEach(button => {
//       button.addEventListener('click', function () {
//         const saleId = this.dataset.id;
//         showSaleDetails(saleId, salesData, customers);
//       });
//     });


//     document.getElementById('getSalesData').addEventListener('click', function () {
//       const selectedSaleId = document.getElementById('choices-sales-dropdown').value;
      
//       const selectedSale = salesData.data.find(sale => sale._id === selectedSaleId);
//       if (selectedSale) {

//         const selectedCustomer = customers.find(c => c._id === selectedSale.customerId);

//         const saleProfitLossData = createProfitLossSummaryTable({ data: [selectedSale] });
//         updateProfitLossChart(saleProfitLossData, profitLossChartCanvas); 

//       } else {
//         const profitLossData = createProfitLossSummaryTable(salesData);
//         updateProfitLossChart(profitLossData, profitLossChartCanvas);
//       }
//     });

//   } catch (error) {
//     console.error("Hata:", error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Hata!',
//       text: 'Veriler yüklenirken bir hata oluştu.',
//     });
//   }

//   function populateDataTableWithSales(salesData, customers) {
//     const salesTableBody = document.getElementById('sales-list-body');
//     salesTableBody.innerHTML = ''; 

//     salesData.data.forEach((sale) => {
//       const customer = customers.find((c) => c._id === sale.customerId);
//       const row = document.createElement('tr');
//       const saleDate = new Date(sale.createdAt);
//       const formattedDate = saleDate.toLocaleDateString('tr-TR');

//       let totalSalePrice = 0;
//       let totalCostPrice = 0;

//       sale.saleProducts.forEach((product) => {
//         const { quantity, salePrice, costPrice } = product;

//         totalSalePrice += salePrice * quantity;
//         totalCostPrice += costPrice;
//       });

//       row.innerHTML = `
//         <td>${customer ? customer.companyName : 'Bilinmiyor'}</td>
//         <td>${totalSalePrice || '0'}</td>
//         <td>${totalCostPrice || '0'}</td>
//         <td>${totalSalePrice - totalCostPrice || '0'}</td>
//         <td>${formattedDate || 'Bilinmiyor'}</td>
//         <td>
//           <button class="btn btn-info show-details-button" data-id="${sale._id}">
//             <i class="fa-solid fa-eye"></i> Detay
//           </button>
//         </td>
//       `;
//       salesTableBody.appendChild(row);
//     });
//   }

//   function populateSalesDropdown(salesData, customers) {
//     const salesDropdown = document.getElementById('choices-sales-dropdown');
//     salesDropdown.innerHTML = '<option value="">Satış Seçin</option>'; 

//     salesData.data.forEach((sale) => {
//       const customer = customers.find((c) => c._id === sale.customerId);
//       const saleDate = new Date(sale.createdAt);
//       const formattedDate = saleDate.toLocaleDateString('tr-TR');

//       const option = document.createElement('option');
//       option.value = sale._id; 
//       option.textContent = `${customer ? customer.companyName : 'Bilinmiyor'} - ${formattedDate}`;
//       salesDropdown.appendChild(option);
//     });
//   }

//   function createProfitLossSummaryTable(salesData) {
//     const profitLossSummaryBody = document.getElementById('profit-loss-summary-body');
//     profitLossSummaryBody.innerHTML = ''; 

//     let totalSales = 0;
//     let totalCosts = 0;

//     salesData.data.forEach((sale) => {
//       sale.saleProducts.forEach((product) => {
//         const { quantity, salePrice, costPrice } = product;

//         totalSales += salePrice * quantity;
//         totalCosts += costPrice;
//       });
//     });

//     const totalProfit = totalSales - totalCosts;

//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${totalSales || '0'}</td>
//       <td>${totalCosts || '0'}</td>
//       <td>${totalProfit || '0'}</td>
//     `;
//     profitLossSummaryBody.appendChild(row);

//     return { totalSales, totalCosts, totalProfit };
//   }

//   function updateProfitLossChart(data, canvas) {
//     const ctx = canvas.getContext('2d');
//     if (!ctx) {
//       console.error("Canvas bağlamı alınamadı.");
//       return;
//     }

//     if (canvas.chart) {
//       canvas.chart.destroy();
//     }

//     canvas.chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Toplam Satış', 'Toplam Maliyet', 'Toplam Kar/Zarar'],
//         datasets: [
//           {
//             label: 'Değerler',
//             data: [data.totalSales, -data.totalCosts, data.totalProfit],
//             backgroundColor: [
//               'rgba(54, 162, 235, 0.8)',
//               'rgba(255, 99, 132, 0.8)', 
//               'rgba(75, 192, 192, 0.8)', 
//             ],
//             borderColor: [
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 99, 132, 1)',
//               'rgba(75, 192, 192, 1)',
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             display: false, 
//           },
//           tooltip: {
//             callbacks: {
//               label: function (context) {
//                 let value = context.raw;
//                 return value >= 0 ? `Değer: ${value}` : `Negatif Değer: ${value}`;
//               },
//             },
//           },
//         },
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: 'Veri Türü',
//             },
//           },
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Değer (TL)',
//             },
//             ticks: {
//               callback: function (value) {
//                 return value + ' TL'; 
//               },
//             },
//           },
//         },
//       },
//     });
//   }  

//   async function showSaleDetails(saleId, salesData, customers, getProduct) {
//     // Satış ve müşteri verilerini bulma
//     async function getProduct(productId) {
//       try {
//         const response = await axios.post(
//           'http://localhost:3001/api/v1/crm/product/getProduct',
//           { productId },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: 'Bearer YOUR_TOKEN_HERE',
//             },
//           },
//         )
//         return response.data.data
//       } catch (error) {
//         console.error('Ürün bilgilerini alma hatası:', error)
//         throw error
//       }
//     }

//     const sale = salesData.data.find(s => s._id === saleId);
//     const customer = customers.find(c => c._id === sale.customerId);
  
//     // Müşteri bilgilerini ekrana yazdırma
//     document.getElementById('details-customer-name').textContent = customer ? customer.companyName : 'Bilinmiyor';
//     document.getElementById('details-customer-tax-number').textContent = customer ? customer.taxNumber : 'Bilinmiyor';
//     document.getElementById('details-customer-address').textContent = customer ? customer.address : 'Bilinmiyor';
//     document.getElementById('details-customer-phone').textContent = customer ? customer.phone : 'Bilinmiyor';
//     document.getElementById('details-customer-email').textContent = customer ? customer.email : 'Bilinmiyor';
  
//     // Ürünlerin listesini oluşturma
//     const productsList = document.getElementById('details-products-list');
//     productsList.innerHTML = ''; // Önceden eklenmiş içerikleri temizle
    
//     for (const product of sale.saleProducts) {
//       try {
//         const productInfo = await getProduct(product.productId); // getProduct asenkron fonksiyonu
//         const productName = productInfo.productName || 'Bilinmiyor'; // Ürün adını al
//         const salePrice = product.salePrice || 0; // Satış fiyatını al
//         const quantity = product.quantity || 0; // Miktarını al
//         const totalPrice = (salePrice * quantity).toFixed(2); // Toplam fiyatı hesapla
  
//         // Ürün satırını oluştur
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td>${productName}</td>
//           <td>${salePrice}</td>
//           <td>${quantity}</td>
//           <td>${totalPrice}</td>
//         `;
//         productsList.appendChild(row); // Ürün satırını tabloya ekle
//       } catch (error) {
//         console.error('Ürün alma hatası:', error);
//         // Hata durumunda alternatif bilgi verebilirsiniz
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td colspan="4">Ürün bilgisi alınamadı</td>
//         `;
//         productsList.appendChild(row);
//       }
//     }
  
//     // Ödeme geçmişini ve toplam ödemeleri hesapla
//     const paymentHistory = customer && customer.paymentHistory ? customer.paymentHistory : [];
//     const totalPayments = paymentHistory.reduce((sum, payment) => sum + (payment.paymentAmount || 0), 0);
//     const totalSalePayment = (sale.salePayment || 0) + totalPayments;
  
//     // Satış ödeme bilgilerini ekrana yazdır
//     document.getElementById('details-sale-payment').textContent = totalSalePayment.toFixed(2) || '0';
//     document.getElementById('details-payment-plan').textContent = sale.paymentPlan || 'Bilinmiyor';
//     document.getElementById('details-payment-status').textContent = sale.paymentStatus || 'Bilinmiyor';
//     document.getElementById('details-net-price').textContent = sale.netPrice !== undefined && sale.netPrice !== null ? sale.netPrice : '0';  // Sıfırsa 0 göster
//     document.getElementById('details-additional-costs').textContent = sale.additionalCosts !== undefined && sale.additionalCosts !== null ? sale.additionalCosts : '0';  // Sıfırsa 0 göster
//     document.getElementById('details-description').textContent = sale.description || 'Bilinmiyor';
  
//     // Modal'ı göster
//     const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
//     detailsModal.show();
//   }  
// });

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
    );
    return response.data.data;
  } catch (error) {
    console.error('Müşteri bilgilerini alma hatası:', error);
    throw error;
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
    );
    return response.data.data;
  } catch (error) {
    console.error('Ürün bilgilerini alma hatası:', error);
    throw error;
  }
}

async function getSale(saleId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/getSale',
      { saleId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Satış bilgilerini alma hatası:', error);
    throw error;
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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Kullanıcı verilerini al
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

    // Ürün ve satış verilerini al
    const products = await getProduct();
    const salesData = await getSale();

    // Verileri işleyip render et
    renderProductUsage(products);
    renderSalesActivities(salesData);
    renderSalesGraph(salesData);
    renderProductUsageTable(products);
  } catch (error) {
    console.error('Dashboard yüklenirken hata oluştu:', error);
  }
});

function renderProductUsage(products) {
  const ctx = document.getElementById('pieChart').getContext('2d');
  const labels = products.map((product) => product.productName);
  const data = products.map((product) => product.stock);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Ürün Stokları',
          data,
          backgroundColor: [
            '#FF5733', // Bar 1
            '#33FF57', // Bar 2
            '#3357FF', // Bar 3
            '#FFC300', // Bar 4
            '#DAF7A6', // Bar 5
            '#C70039', // Bar 6
            '#581845', // Bar 7
          ], // Her bir bar için farklı renk
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} adet`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Ürünler',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Stok Adeti',
          },
          beginAtZero: true,
        },
      },
    },
  });  
}

function renderProductUsageTable(products) {
  const list = document.getElementById('product-usage-list');
  list.innerHTML = '';

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.productName}</td>
      <td>${product.stock}</td>
      <td>${product.stock > 300 ? 'Yeterli' : 'Yetersiz'}</td>
    `;
    list.appendChild(row);
  });
}

async function renderSalesActivities(salesData) {
  const list = document.getElementById('sales-activity-list');
  list.innerHTML = '';

  for (const sale of salesData.data) {
    try {
      const customer = sale.customerId ? await getCustomer(sale.customerId) : null;
      const companyName = customer ? customer.companyName : 'Bilinmiyor';
      const paymentStatus = sale.paymentStatus || 'Bilinmiyor';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${companyName}</td>
        <td>${paymentStatus}</td>
        <td>${new Date(sale.createdAt).toLocaleDateString()}</td>
      `;
      list.appendChild(row);
    } catch (error) {
      console.error('Satış aktivitesi yüklenirken hata oluştu:', error);
    }
  }
}

function renderSalesGraph(salesData) {
  const ctx = document.getElementById('salesChart').getContext('2d');
  const dates = [...new Set(salesData.data.map((sale) => new Date(sale.createdAt).toLocaleDateString()))];
  const salesByDate = dates.map((date) => {
    return salesData.data
      .filter((sale) => new Date(sale.createdAt).toLocaleDateString() === date)
      .reduce((total, sale) => {
        return total + sale.saleProducts.reduce((productTotal, product) => productTotal + product.quantity, 0);
      }, 0);
  });

  new Chart(ctx, {
    type: 'bar', 
    data: {
      labels: dates, 
      datasets: [
        {
          label: 'Günlük Satışlar',
          data: salesByDate, 
          backgroundColor: salesByDate.map((_, i) => {
            const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD733'];
            return colors[i % colors.length]; 
          }),
          borderColor: salesByDate.map((_, i) => {
            const borderColors = ['#FF2E00', '#00FF2E', '#002EFF', '#FF007F', '#FFC700'];
            return borderColors[i % borderColors.length]; 
          }),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'y', 
      scales: {
        x: {
          title: {
            display: true,
            text: 'Satış Adeti',
          },
          ticks: {
            beginAtZero: true, 
          },
        },
        y: {
          title: {
            display: true,
            text: 'Tarih',
          },
        },
      },
      plugins: {
        legend: {
          display: true, 
          position: 'top',
        },
      },
    },
  });
  
}
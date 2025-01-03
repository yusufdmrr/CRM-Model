function getJWTFromCookie() {
    const name = 'token='
    const cookieArray = document.cookie.split(';')
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim() // trim ile baştaki ve sondaki boşlukları temizleyin
      if (cookie.indexOf(name) === 0) {
        return decodeURIComponent(cookie.substring(name.length, cookie.length)) // Değerini decode edin
      }
    }
    return null
  }
  const jwt = getJWTFromCookie()

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

async function updateSale(updatedSales) {
    try {
        let response = await axios.post(
            'http://localhost:3001/api/v1/crm/sale/updateSale', 
            { updatedSales },  // Tüm güncellenmiş satışlar burada gönderiliyor
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Satış güncelleme hatası:', error);
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

async function getCustomerDebt(customerId = null) {
    try {
      const url = 'http://localhost:3001/api/v1/crm/sale/getCustomerDebt';

      const data = customerId ? { customerId } : {}; 
      const response = await axios.post(
        url,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_TOKEN_HERE',
          },
        }
      );

      if (response.data) {
        return response.data.totalDebt; 
      } else {
        throw new Error('Borç verisi alınamadı.');
      }
    } catch (error) {
      console.error('Müşteri borcunu alma hatası:', error);
      throw error;
    }
}  

async function makePayment(customerId, paymentAmount, paymentMethod) {
    try {
      console.log("asdasdasdasdas",{ customerId, paymentAmount, paymentMethod }); // Verileri konsola yazdırarak doğrulayın
      
      const response = await axios.post(
        'http://localhost:3001/api/v1/crm/sale/makePayment', 
        { customerId, paymentAmount, paymentMethod }, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_TOKEN_HERE', // Token burada kullanılmalı
          },
        }
      );
  
      return response.data; // Başarılı yanıtı döndür
    } catch (error) {
      console.error('Ödeme işlemi hatası:', error.response ? error.response.data : error); // Daha detaylı hata bilgisi
      throw error; // Hata fırlat
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

      let payload;
    
      if (jwt && jwt.split('.').length === 3) {
          console.log('Cookie içindeki JWT:', jwt);
          try {
              const parts = jwt.split('.');
              const header = JSON.parse(atob(parts[0]));
              payload = JSON.parse(decodeURIComponent(escape(window.atob(parts[1]))));
 
              console.log('Header:', header);
              console.log('Payload:', payload);
          } catch (error) {
              console.error('Geçersiz JWT formatı:', error);
              window.location.href = 'file:///C:/Users/Demir/Desktop/Yusuf2/yusuf/front/template/pages/users/login-page.html';
            }
      } else {
        window.location.href = 'file:///C:/Users/Demir/Desktop/Yusuf2/yusuf/front/template/pages/users/login-page.html';
        console.log('JWT cookie bulunamadı veya geçersiz formatta.');
      }

        const customers = await getCustomer(); 
        let salesData = await getSale(); 
        const res = await getUsers(payload.userId)

        const domm = document.querySelector('#user-name')
        const dommm = document.querySelector('#user-departman')
    
        dommm.innerHTML = res.data[0].name + ' ' + res.data[0].surname
        domm.innerHTML= res.data[0].role    
        
        const customerSelect = document.getElementById('customerSelect');
        const paymentCustomerSelect = document.getElementById('paymentCustomerSelect');
        const customerDebtTable = document.getElementById('customerDebtTable');

        customers.forEach((customer) => {
            const option = document.createElement('option');
            option.value = customer._id;
            option.textContent = customer.companyName;
            customerSelect.appendChild(option);
            paymentCustomerSelect.appendChild(option.cloneNode(true));
        });

        displayCustomerDebts(customers, salesData.data);

        customerSelect.addEventListener('change', function () {
            const selectedCustomerId = customerSelect.value;
            if (selectedCustomerId === 'all') {
                displayCustomerDebts(customers, salesData.data);
            } else {
                const filteredSales = salesData.data.filter((sale) => sale.customerId === selectedCustomerId);
                displayCustomerDebts(customers, filteredSales);
            }
        });

        document.getElementById('makePayment').addEventListener('click', async function () {
            const selectedCustomerId = paymentCustomerSelect.value; 
            const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
            const paymentMethod = document.getElementById('paymentMethod').value;

            if (
                selectedCustomerId === 'select' || 
                isNaN(paymentAmount) ||
                paymentAmount <= 0 ||
                paymentMethod === ''
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Hata!',
                    text: 'Lütfen geçerli bir müşteri, ödeme tutarı ve ödeme yöntemi seçin.',
                });
                return;
            }

            try {
                const customerSales = salesData.data.filter((sale) => sale.customerId === selectedCustomerId);
                const totalDebt = customerSales.reduce((total, sale) => total + (sale.netPrice || 0), 0);

                if (paymentAmount > totalDebt) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata!',
                        text: 'Ödeme tutarı borçtan fazla olamaz.',
                    });
                    return;
                }

                await makePayment(
                    selectedCustomerId,
                    paymentAmount,
                    paymentMethod, 
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı!',
                    text: `Ödeme başarıyla yapıldı. ${paymentAmount.toFixed(2)}₺ borcunuzdan düşüldü.`,
                    confirmButtonText: 'Tamam'
                }).then(async () => {
                    salesData = await getSale();  
                    displayCustomerDebts(customers, salesData.data);  
                });

            } catch (error) {
                console.error('Ödeme işlemi hatası:', error.response ? error.response.data : error);  
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Ödeme işlemi gerçekleştirilemedi. Lütfen tekrar deneyin.',
                });
            }
        });

        function displayCustomerDebts(customers, sales) {
            customerDebtTable.innerHTML = ''; 

            const debts = customers.map((customer) => {
                const customerSales = sales.filter((sale) => sale.customerId === customer._id);
                const totalDebt = customerSales.reduce((total, sale) => total + (sale.netPrice || 0), 0);

                return {
                    customer,
                    totalDebt
                };
            });

            if (debts.length > 0) {
                debts.forEach((debt) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${debt.customer.companyName}</td>
                        <td>${debt.totalDebt > 0 ? debt.totalDebt.toFixed(2) : '0.00'}₺</td>
                    `;
                    customerDebtTable.appendChild(row);
                });
            } else {
                customerDebtTable.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center">Veri bulunmamaktadır.</td>
                    </tr>
                `;
            }

            displayDebtBarChart(debts);  
        }

        function displayDebtBarChart(debts) {
            const debtBarChartCanvas = document.getElementById('debtBarChart'); 

            if (window.debtBarChart instanceof Chart) {
                window.debtBarChart.destroy(); 
            }

            const debtLabels = debts.map((debt) => debt.customer.companyName);
            const debtValues = debts.map((debt) => debt.totalDebt);

            window.debtBarChart = new Chart(debtBarChartCanvas, {
                type: 'bar',
                data: {
                    labels: debtLabels,
                    datasets: [{
                        label: 'Toplam Borç (₺)',
                        data: debtValues,
                        backgroundColor: ['#ff5733', '#33c3ff', '#66ff66', '#ffcc00', '#ff3399'],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Müşteri Adı'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Borç Tutarı (₺)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '₺';
                                }
                            }
                        }
                    }
                }
            });
        }

    } catch (error) {
        console.error('Hata oluştu:', error);
        Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Veriler alınırken bir sorun oluştu.',
        });
    }
});
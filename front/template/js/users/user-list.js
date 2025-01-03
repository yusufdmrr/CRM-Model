async function getSale(saleId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/getSale',
      { saleId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE', // Buraya gerçek token'ı koy
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Satış bilgilerini alma hatası:', error)
    throw error
  }
}

async function updateSale(saleId, updatedData) {
  try {
    let response = await axios.post(
      `http://localhost:3001/api/v1/crm/sale/updateSale?saleId=${saleId}`,
      updatedData,
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE', // Buraya gerçek token'ı koyun
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Satış güncelleme hatası:', error)
    throw error
  }
}

async function deleteSale(saleId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/deleteSale',
      { saleId },
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE', // Buraya gerçek token'ı koy
        },
      },
    )

    if (response.status === 200) {
      console.log('Satış başarıyla silindi:', response.data)
    }

    return response.data
  } catch (error) {
    console.error('Silme işlemi hatası:', error)
  }
}

async function setSale(saleData) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/sale/setSale',
      saleData,
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Satış ekleme hatası:', error)
    throw error
  }
}

async function getCategory() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getCategory',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Kategori alma hatası:', error)
    throw error
  }
}

async function getCurrency() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getCurrency',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Para birimi alma hatası:', error)
    throw error
  }
}

async function getTaxRate() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getTaxRate',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Vergi oranı alma hatası:', error)
    throw error
  }
}

async function getPaymentType() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getPaymentType',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ödeme türü alma hatası:', error)
    throw error
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

async function deleteStock(productId, quantity) {
  try {
    const stockData = {
      productId: productId,
      quantity: quantity,
    }

    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/deleteStock',
      stockData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Stok silme hatası:', error)
    throw error
  }
}

async function setStockAction(productId, quantity, actionType) {
  try {
    const stockActionData = {
      productId: productId,
      quantity: quantity,
      type: actionType,
    }

    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setStockAction',
      stockActionData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Stok hareket kaydı ekleme hatası:', error)
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

    // Kullanıcı bilgilerini doldur
    if (userResponse?.data?.length > 0) {
      dommm.innerHTML = `${userResponse.data[0].name} ${userResponse.data[0].surname}`;
      domm.innerHTML = userResponse.data[0].role;
    } else {
      console.warn('Kullanıcı bilgisi bulunamadı.');
      dommm.innerHTML = 'Bilinmiyor';
      domm.innerHTML = 'Bilinmiyor';
    }

    // Müşteri, ürün ve satış verilerini al
    const customers = await getCustomer();
    const products = await getProduct();
    const salesData = await getSale();

    // Satış tablosunu oluştur
    populateDataTableWithSales(salesData, customers);

    // Tarih filtreleme işlemleri
    const salesTableBody = document.getElementById('sales-table-body');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');

    function applyDateFilter() {
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;

      if (startDate && endDate) {
        const filteredSales = salesData.data.filter((sale) => {
          const saleDate = new Date(sale.createdAt);
          const start = new Date(startDate);
          const end = new Date(endDate);

          return saleDate >= start && saleDate <= end;
        });

        displaySales(filteredSales);
      } else {
        displaySales(salesData.data);
      }
    }

    // Tarih filtresi uygula
    document.getElementById('apply-date-filter').addEventListener('click', applyDateFilter);

    // Tarih filtresini temizle
    document.getElementById('clear-date-filter').addEventListener('click', function () {
      startDateInput.value = '';
      endDateInput.value = '';
      applyDateFilter();
    });

    function displaySales(sales) {
      salesTableBody.innerHTML = '';

      sales.forEach((sale) => {
        const customer = customers.find((c) => c._id === sale.customerId);
        const row = document.createElement('tr');
        const saleDate = new Date(sale.createdAt);
        const formattedDate = saleDate.toLocaleDateString('tr-TR');
        row.innerHTML = `
          <td>${customer ? customer.companyName : 'Bilinmiyor'}</td>
          <td>${formattedDate || 'Bilinmiyor'}</td>
          <td>${sale.paymentPlan || 'Bilinmiyor'}</td>
          <td><span class="badge bg-success-transparent">${sale.paymentStatus || 'Bilinmiyor'}</span></td>
          <td>${sale.netPrice || '0'}</td>
          <td>
            <button class="btn btn-info show-details-button" data-id="${sale._id}">
              <i class="fa-solid fa-eye"></i> Detay
            </button>
            <button class="btn btn-danger delete-sale-button" data-id="${sale._id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        salesTableBody.appendChild(row);
      });

      // Detay butonları
      document.querySelectorAll('.show-details-button').forEach((button) => {
        button.addEventListener('click', async function (e) {
          const saleId = e.target.closest('button').getAttribute('data-id');

          try {
            const sale = salesData.data.find((s) => s._id === saleId);
            const customer = customers.find((c) => c._id === sale.customerId);

            if (sale) {
              document.getElementById('details-customer-name').textContent = customer ? customer.companyName : 'Bilinmiyor';
              document.getElementById('details-customer-tax-number').textContent = customer ? customer.taxNumber : 'Bilinmiyor';
              document.getElementById('details-customer-address').textContent = customer ? customer.address : 'Bilinmiyor';
              document.getElementById('details-customer-phone').textContent = customer ? customer.phone : 'Bilinmiyor';
              document.getElementById('details-customer-email').textContent = customer ? customer.email : 'Bilinmiyor';

              const productDetails = sale.saleProducts.map((item) => {
                const product = products.find((p) => p._id === item.productId);
                return ` 
                  <tr>
                    <td>${product ? product.productName : 'Bilinmiyor'}</td>
                    <td>${item.salePrice || 'Bilinmiyor'}</td>
                    <td>${item.quantity || 'Bilinmiyor'}</td>
                    <td>${(item.salePrice * item.quantity).toFixed(2) || 'Bilinmiyor'}</td>
                  </tr>
                `;
              }).join('');

              document.getElementById('details-products-list').innerHTML = productDetails;

              document.getElementById('details-payment-plan').textContent = sale.paymentPlan || 'Bilinmiyor';
              document.getElementById('details-payment-status').textContent = sale.paymentStatus || 'Bilinmiyor';
              document.getElementById('details-net-price').textContent = sale.netPrice !== undefined && sale.netPrice !== null ? sale.netPrice : '0';

              const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
              detailsModal.show();
            }
          } catch (error) {
            console.error('Detay gösterim hatası:', error);
            Swal.fire({
              icon: 'error',
              title: 'Hata!',
              text: 'Satış detayları getirilemedi.',
            });
          }
        });
      });

      // Silme butonları
      document.querySelectorAll('.delete-sale-button').forEach((button) => {
        button.addEventListener('click', async function (e) {
          const saleId = e.target.closest('button').getAttribute('data-id');

          const result = await Swal.fire({
            title: 'Satışı Silmek Üzeresiniz',
            text: 'Bu işlemi geri alamazsınız!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, sil',
            cancelButtonText: 'Hayır, iptal',
          });

          if (result.isConfirmed) {
            try {
              const response = await deleteSale(saleId);
              if (response && response.message === 'İşlem başarılı.') {
                await Swal.fire({
                  icon: 'success',
                  title: 'Satış Silindi!',
                  text: 'Satış başarıyla silindi!',
                });
                location.reload();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Hata!',
                  text: 'Satış silinemedi. Lütfen tekrar deneyin.',
                });
              }
            } catch (error) {
              console.error('Silme işlemi hatası:', error);
              Swal.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Bir hata oluştu.',
              });
            }
          }
        });
      });
    }

    displaySales(salesData.data);
  } catch (error) {
    console.error('Bir hata oluştu:', error);
  }
});

function populateDataTableWithSales(salesData, customers) {
  if (!$().DataTable) {
    console.warn('Uyarı - datatables.min.js yüklenmedi.');
    return;
  }

  const table = $('#sales-table').DataTable({
    data: salesData.data.map((sale) => {
      const customer = customers.find((c) => c._id === sale.customerId);
      const saleDate = new Date(sale.createdAt);
      const formattedDate = saleDate.toLocaleDateString('tr-TR');
      return {
        ...sale,
        customer: customer ? customer.companyName : 'Bilinmiyor',
        createdAt: formattedDate,
        actions: ` 
          <button class="btn btn-info show-details-button" data-id="${sale._id}"> 
            <i class="fa-solid fa-eye"></i> Detay 
          </button> 
          <button class="btn btn-danger delete-sale-button" data-id="${sale._id}"> 
            <i class="fa-solid fa-trash"></i> 
          </button> 
        `,
      };
    }),
    paging: true,
    searching: true,
    info: false,
    pageLength: 10,
    lengthMenu: [10, 25, 50, 100],
    dom: 'lBfrtip',
    columns: [
      { data: 'customer', title: "Müşteri" },
      { data: 'createdAt', title: "Tarih" },
      { data: 'paymentPlan', title: "Ödeme Planı" },
      { data: 'paymentStatus', title: "Ödeme Durumu" },
      { data: 'netPrice', title: "Net Ücret" },
      { data: 'actions', title: "İşlem", orderable: false }
    ],
  });

  $('#sales-table_filter').hide();

  $('#sales-search').on('keyup', function () {
    table.search(this.value).draw();
  });
}
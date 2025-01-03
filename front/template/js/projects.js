async function setProduct(product) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setProduct',
      product,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ürün ekleme hatası:', error)
    throw error
  }
}

async function deleteProduct(productId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/deleteProduct',
      { productId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ürün silme hatası:', error)
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

async function updateProduct(productId, productData) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/updateProduct',
      { productId, ...productData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error)
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

async function setStock(stockData) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setStock',
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
    console.error('Stok ekleme hatası:', error)
    throw error
  }
}

async function getStockHistory(productId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getStockHistory',
      { productId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Stok geçmişini alma hatası:', error)
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

document.getElementById('add-product-button').addEventListener('click', async () => {
  // Ürün bilgilerini al
  const productName = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const unitPrice = parseFloat(document.getElementById('product-unitPrice').value);
  const category = document.getElementById('product-category').value;
  const currency = document.getElementById('product-currency').value;
  const taxRate = document.getElementById('product-tax-rate').value;
  const paymentType = document.getElementById('product-payment-type').value;
  const taxIncludedValue = document.getElementById('product-tax-included').value; // String olarak alınır

  // Girdi kontrolleri
  if (
    !productName ||
    isNaN(unitPrice) ||
    !category ||
    !currency ||
    !taxRate ||
    !paymentType ||
    taxIncludedValue === ""
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Tüm alanları doğru doldurduğunuzdan emin olun.',
    });
    return;
  }

  // String değeri boolean'a dönüştür
  const taxIncluded = taxIncludedValue === 'true';

  // API'ye gönderilecek ürün verileri
  const productData = {
    productName,
    description,
    unitPrice,
    category,
    currency,
    taxRate,
    paymentType,
    taxIncluded, // Boolean olarak gönderiliyor
  };

  try {
    await setProduct(productData);
    Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Ürün başarıyla eklendi.',
    }).then(() => {
      window.location.reload(); // Sayfayı yenile
    });
  } catch (error) {
    console.error('Ürün ekleme hatası:', error.response?.data || error.message);
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: error.response?.data?.msg || 'Ürün eklenirken bir sorun oluştu.',
    });
  }
});

document.addEventListener('DOMContentLoaded', async function () {
  // Ürünleri yükle ve göster
  async function loadProducts() {
    try {
      const products = await getProduct();
      const productsContainer = document.getElementById('products-container');
      const stockProductDropdown = document.getElementById('stock-product');
      
      productsContainer.innerHTML = ''; // Önceki ürünleri temizle
      stockProductDropdown.innerHTML = ''; // Dropdown'u temizle

      // Dropdown için varsayılan seçenek
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Ürün seçin';
      stockProductDropdown.appendChild(defaultOption);

      if (!Array.isArray(products)) {
        console.error('Ürünler bir dizi formatında değil:', products);
        return;
      }

      // Ürünleri tabloya ve dropdown'a ekle
      products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.productName || 'Adı Yok'}</td>
          <td>${product.unitPrice || 'Fiyat Yok'}</td>
          <td>${product.stock || 'Stok Bilgisi Yok'}</td>
          <td>${product.description || 'Açıklama Yok'}</td>
          <td>
            <button class="btn btn-primary update-product-button" data-bs-toggle="modal" data-bs-target="#updateProductModal" data-id="${product._id}">
              <i class="fa-solid fa-edit"></i>
            </button>
            <button class="btn btn-danger delete-product-button" data-id="${product._id}">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-info stock-history-button" data-bs-toggle="modal" data-bs-target="#stockHistoryModal" data-id="${product._id}">
              <i class="fa-solid fa-history"></i>
            </button>
          </td>
        `;
        productsContainer.appendChild(row);

        // Dropdown için ürün ekle
        const option = document.createElement('option');
        option.value = product._id;
        option.textContent = product.productName;
        stockProductDropdown.appendChild(option);
      });
    } catch (error) {
      console.error('Ürün yükleme hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Ürünler yüklenirken bir sorun oluştu.',
      });
    }
  }

  // Ürün silme işlemi
  document.addEventListener('click', async function (event) {
    if (event.target.closest('.delete-product-button')) {
      const productId = event.target.closest('.delete-product-button').getAttribute('data-id');
      Swal.fire({
        title: 'Emin misiniz?',
        text: 'Bu ürünü silmek üzeresiniz. İşlem geri alınamaz!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'Hayır, iptal et',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteProduct(productId);
            Swal.fire({
              icon: 'success',
              title: 'Başarılı!',
              text: 'Ürün başarıyla silindi.',
            }).then(() => {
              window.location.reload();
            });
          } catch (error) {
            console.error('Ürün silme hatası:', error);
            Swal.fire({
              icon: 'error',
              title: 'Hata!',
              text: 'Ürün silinirken bir sorun oluştu.',
            });
          }
        }
      });
    }
  });

  // Stok geçmişini göster
  document.addEventListener('click', async function (event) {
    if (event.target.closest('.stock-history-button')) {
      const productId = event.target.closest('.stock-history-button').getAttribute('data-id');
      await loadStockHistory(productId);
    }
  });

  async function loadStockHistory(productId) {
    try {
      const response = await getStockHistory(productId);
      const stockHistory = response.data || [];
      const stockHistoryContainer = document.getElementById('stock-history-container');
      stockHistoryContainer.innerHTML = ''; // Önceki stok geçmişini temizle

      if (!Array.isArray(stockHistory)) {
        console.error('Stok geçmişi verisi bir dizi değil:', stockHistory);
        return;
      }

      stockHistory.forEach((history, index) => {
        const row = document.createElement('tr');
        const date = new Date(history.createdAt).toLocaleDateString('tr-TR');
        let action = history.type || 'Bilinmiyor';

        if (history.isActive === false) {
          action = 'İade';
        } else if (action === 'purchase') {
          action = 'Stok Ekleme';
        } else if (action === 'expense') {
          action = 'Satış';
        }

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${date}</td>
          <td>${action}</td>
          <td>${history.quantity || '0'}</td>
        `;
        stockHistoryContainer.appendChild(row);
      });
    } catch (error) {
      console.error('Stok geçmişi yükleme hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Stok geçmişi yüklenirken bir sorun oluştu.',
      });
    }
  }

  // Stok ekleme işlemi
  document.getElementById('accept-add-stock-button').addEventListener('click', async function () {
    const productId = document.getElementById('stock-product').value;
    const quantity = parseInt(document.getElementById('stock-quantity').value, 10);

    if (!productId || isNaN(quantity) || quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Geçerli bir ürün ve miktar girin!',
      });
      return;
    }

    try {
      const stockData = { productId, quantity, type: 'purchase' };
      await setStock(stockData);
      Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Stok başarıyla eklendi.',
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Stok ekleme hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Stok eklenirken bir sorun oluştu.',
      });
    }
  });

  // Dropdown verilerini doldurma
  async function getDropdownData() {
    try {
      const [categoriesResponse, currenciesResponse, taxRatesResponse, paymentTypesResponse] = await Promise.all([
        getCategory(),
        getCurrency(),
        getTaxRate(),
        getPaymentType(),
      ]);

      populateDropdown('product-category', categoriesResponse.data || []);
      populateDropdown('product-currency', currenciesResponse.data || []);
      populateDropdown('product-tax-rate', taxRatesResponse.data || []);
      populateDropdown('product-payment-type', paymentTypesResponse.data || []);
    } catch (error) {
      console.error('Dropdown verilerini alma hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Dropdown verileri yüklenirken bir sorun oluştu.',
      });
    }
  }

  function populateDropdown(elementId, options) {
    const dropdown = document.getElementById(elementId);
    dropdown.innerHTML = '';

    options.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = option._id || option.code;
      opt.textContent = option.name || option.displayName;
      dropdown.appendChild(opt);
    });
  }

  // Başlangıçta ürünleri ve dropdown verilerini yükle
  await getDropdownData();
  await loadProducts();
});

// document.addEventListener('DOMContentLoaded', async function () {

//   const domm = document.querySelector('#user-name')
//   const dommm = document.querySelector('#user-departman')

//   dommm.innerHTML = res.data[0].name + ' ' + res.data[0].surname
//   domm.innerHTML= res.data[0].role

//   async function loadProducts() {
//     try {
//       const products = await getProduct()
//       const productsContainer = document.getElementById('products-container')
//       productsContainer.innerHTML = '' // Clear previous products

//       products.forEach((product) => {
//         const row = document.createElement('tr')

//         row.innerHTML = `
//           <td>${product.productName}</td>
//           <td>${product.unitPrice}</td>
//           <td>${product.stock}</td>
//           <td>${product.description}</td>
//           <td>
//             <button class="btn btn-primary update-product-button" data-bs-toggle="modal" data-bs-target="#updateProductModal" data-id="${product._id}">
//               <i class="fa-solid fa-edit"></i> 
//             </button>
//             <button class="btn btn-danger delete-product-button" data-bs-toggle="modal" data-bs-target="#deleteProductModal" data-id="${product._id}">
//               <i class="fa-solid fa-trash"></i> 
//             </button>
//             <button class="btn btn-info stock-history-button" data-bs-toggle="modal" data-bs-target="#stockHistoryModal" data-id="${product._id}">
//               <i class="fa-solid fa-history"></i>
//             </button>
//           </td>
//         `

//         productsContainer.appendChild(row)
//       })
//     } catch (error) {
//       console.error('Ürün yükleme hatası:', error)
//     }
//   }

//   async function getDropdownData() {
//     try {
//       const [
//         categoriesResponse,
//         currenciesResponse,
//         taxRatesResponse,
//         paymentTypesResponse,
//       ] = await Promise.all([
//         getCategory(),
//         getCurrency(),
//         getTaxRate(),
//         getPaymentType(),
//       ])

//       const categories = categoriesResponse.data || []
//       const currencies = currenciesResponse.data || []
//       const taxRates = taxRatesResponse.data || []
//       const paymentTypes = paymentTypesResponse.data || []

//       populateDropdown('product-category', categories)
//       populateDropdown('product-currency', currencies)
//       populateDropdown('product-tax-rate', taxRates)
//       populateDropdown('product-payment-type', paymentTypes)
//       populateDropdown('update-product-category', categories)
//       populateDropdown('update-product-currency', currencies)
//       populateDropdown('update-product-tax-rate', taxRates)
//       populateDropdown('update-product-payment-type', paymentTypes)
//     } catch (error) {
//       console.error('Dropdown verilerini alma hatası:', error)
//     }
//   }

//   function populateDropdown(elementId, options) {
//     const dropdown = document.getElementById(elementId)
//     dropdown.innerHTML = ''

//     options.forEach((option) => {
//       const opt = document.createElement('option')
//       opt.value = option._id || option.code
//       opt.textContent = option.name || option.displayName
//       dropdown.appendChild(opt)
//     })
//   }

//   await getDropdownData()
//   await loadProducts()

//   document.getElementById('add-product-button').addEventListener('click', async () => {
//     const productData = {
//       productName: document.getElementById('product-name').value,
//       description: document.getElementById('product-description').value,
//       unitPrice: parseFloat(
//         document.getElementById('product-unitPrice').value,
//       ),
//       category: document.getElementById('product-category').value,
//       currency: document.getElementById('product-currency').value,
//       taxRate: document.getElementById('product-tax-rate').value,
//       paymentType: document.getElementById('product-payment-type').value,
//       taxIncluded: document.getElementById('product-tax-included').value,
//     }
//     try {
//       await setProduct(productData)
//       window.location.reload()
//       loadProducts()
//     } catch (error) {
//       console.error('Yeni ürün ekleme hatası:', error)
//     }
//   })

//   document.addEventListener('click', async function (event) {
//     if (event.target.closest('.update-product-button')) {
//       const productId = event.target
//         .closest('.update-product-button')
//         .getAttribute('data-id')
//       await updateProductModal(productId)
//     }
//   })

//   async function updateProductModal(productId) {
//     try {
//       const product = await getProduct(productId)
//       document.getElementById('update-product-name').value = product.productName
//       document.getElementById('update-product-description').value =
//         product.description
//       document.getElementById('update-product-unitPrice').value =
//         product.unitPrice
//       document.getElementById('update-product-category').value =
//         product.category
//       document.getElementById('update-product-currency').value =
//         product.currency
//       document.getElementById('update-product-tax-rate').value = product.taxRate
//       document.getElementById('update-product-payment-type').value =
//         product.paymentType

//       document.getElementById('confirm-update-product').onclick = async () => {
//         const updatedProductData = {
//           productName: document.getElementById('update-product-name').value,
//           description: document.getElementById('update-product-description')
//             .value,
//           unitPrice: parseFloat(
//             document.getElementById('update-product-unitPrice').value,
//           ),
//           category: document.getElementById('update-product-category').value,
//           currency: document.getElementById('update-product-currency').value,
//           taxRate: document.getElementById('update-product-tax-rate').value,
//           paymentType: document.getElementById('update-product-payment-type')
//             .value,
//         }

//         try {
//           await updateProduct(productId, updatedProductData)
//           loadProducts()
//           window.location.reload()
//           $('#updateProductModal').modal('hide')
//         } catch (error) {
//           console.error('Ürün güncelleme hatası:', error)
//         }
//       }

//       $('#updateProductModal').modal('show')
//     } catch (error) {
//       console.error('Ürün bilgilerini alma hatası:', error)
//     }
//   }

//   document.addEventListener('click', function (event) {
//     if (event.target.closest('.delete-product-button')) {
//       const productId = event.target
//         .closest('.delete-product-button')
//         .getAttribute('data-id')
//       openDeleteProductModal(productId)
//     }
//   })

//   function openDeleteProductModal(productId) {
//     document.getElementById('confirm-delete-product-button').onclick =
//       async () => {
//         try {
//           await deleteProduct(productId)
//           loadProducts()
//           window.location.reload()
//           $('#deleteProductModal').modal('hide')
//         } catch (error) {
//           console.error('Ürün silme hatası:', error)
//         }
//       }

//     $('#deleteProductModal').modal('show')
//   }
// })

// document.addEventListener('click', async function (event) {
//   if (event.target.closest('.stock-history-button')) {
//     const productId = event.target.closest('.stock-history-button').getAttribute('data-id')
//     await loadStockHistory(productId)
//   }
// })

// async function loadStockHistory(productId) {
//   try {
//     const response = await getStockHistory(productId)

//     const stockHistory = response.data || []
//     if (!Array.isArray(stockHistory)) {
//       console.error('Stok geçmişi verisi bir dizi değil:', stockHistory)
//       return
//     }
//     const stockHistoryContainer = document.getElementById('stock-history-container')
//     stockHistoryContainer.innerHTML = ''

//     stockHistory.forEach((history, index) => {
//       const row = document.createElement('tr')

//       const date = new Date(history.createdAt).toLocaleDateString('tr-TR')

//       let action = history.type || 'Bilinmiyor'

//       // 'isActive' false olan hareketi "İade" olarak gösteriyoruz
//       if (history.isActive === false) {
//         action = 'İade'
//       } else if (action === 'purchase') {
//         action = 'Stok Ekleme'
//       } else if (action === 'expense') {
//         action = 'Satış'
//       }

//       const quantity = history.quantity || '0'

//       row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${date}</td>
//         <td>${action}</td>
//         <td>${quantity}</td> 
//       `
//       stockHistoryContainer.appendChild(row)
//     })
//   } catch (error) {
//     console.error('Stok geçmişi yükleme hatası:', error)
//   }
// }

// document.addEventListener('DOMContentLoaded', async function () {
//   async function loadProducts() {
//     try {
//       const products = await getProduct()
//       const stockProductDropdown = document.getElementById('stock-product')
//       stockProductDropdown.innerHTML = ''

//       const defaultOption = document.createElement('option')
//       defaultOption.value = ''
//       defaultOption.textContent = 'Ürün seçin'
//       stockProductDropdown.appendChild(defaultOption)

//       products.forEach((product) => {
//         const option = document.createElement('option')
//         option.value = product._id
//         option.textContent = product.productName
//         stockProductDropdown.appendChild(option)
//       })
//     } catch (error) {
//       console.error('Ürün yükleme hatası:', error)
//     }
//   }

//   const addStockButton = document.getElementById('accept-add-stock-button')
//   if (addStockButton) {
//     addStockButton.addEventListener('click', async function () {
//       const productId = document.getElementById('stock-product').value
//       const quantity = parseInt(
//         document.getElementById('stock-quantity').value,
//         10,
//       )

//       const type = 'purchase'

//       if (!productId || isNaN(quantity) || quantity <= 0) {
//         alert('Geçerli bir ürün ve miktar girin!')
//         return
//       }

//       try {
//         const stockData = { productId, quantity, type }
//         await setStock(stockData)
//         loadProducts()
//         window.location.reload()
//         $('#add-stock').modal('hide')
//       } catch (error) {
//         console.error('Stok ekleme hatası:', error)
//       }
//     })
//   }

//   await loadProducts()
// })

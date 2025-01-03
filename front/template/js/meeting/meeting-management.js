async function setCategory(category) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setCategory',
      category,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Kategori ekleme hatası:', error)
    throw error
  }
}

async function deleteCategory(categoryId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/deleteCategory',
      { categoryId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Kategori silme hatası:', error)
    throw error
  }
}

async function getCategory() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getCategory',
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Kategorileri getirme hatası:', error)
    throw error
  }
}

async function setCurrency(currency) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setCurrency',
      currency,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Para birimi ekleme hatası:', error)
    throw error
  }
}

async function deleteCurrency(currencyId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/deleteCurrency',
      { currencyId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Para birimi silme hatası:', error)
    throw error
  }
}

async function getCurrency() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getCurrency',
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Para birimlerini getirme hatası:', error)
    throw error
  }
}

async function setTaxRate(taxRate) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setTaxRate',
      taxRate,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data.data
  } catch (error) {
    console.error('Vergi oranı ekleme hatası:', error)
    throw error
  }
}

async function deleteTaxRate(taxRateId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/deleteTaxRate',
      { taxRateId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Vergi oranı silme hatası:', error)
    throw error
  }
}

async function getTaxRate() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getTaxRate',
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Vergi oranlarını getirme hatası:', error)
    throw error
  }
}

async function setPaymentType(paymentType) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/setPaymentType',
      paymentType,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ödeme tipi ekleme hatası:', error)
    throw error
  }
}

async function deletePaymentType(paymentTypeId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/deletePaymentType',
      { paymentTypeId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ödeme tipi silme hatası:', error)
    throw error
  }
}

async function getPaymentType() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/product/getPaymentType',
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Ödeme tiplerini getirme hatası:', error)
    throw error
  }
}

async function setAuthorizedPerson(authorizedPerson) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/setAuthorizedPerson',
      authorizedPerson,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Yetkili kişi ekleme hatası:', error)
    throw error
  }
}

async function deleteAuthorizedPerson(authorizedPersonId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/deleteAuthorizedPerson',
      { authorizedPersonId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Yetkili kişi silme hatası:', error)
    throw error
  }
}

async function getAuthorizedPerson() {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/getAuthorizedPerson',
      {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Yetkili kişi bilgilerini getirme hatası:', error)
    throw error
  }
}

async function getUsers(userId) {
  try {
    let response = await axios.post('http://localhost:3001/api/v1/crm/user/getUsers', { userId }, {
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
  const categoryList = document.getElementById('category-list')

  async function loadCategories() {
    try {
      const domm = document.querySelector('#user-name')
      const dommm = document.querySelector('#user-departman')

      dommm.innerHTML = res.data[0].name + ' ' + res.data[0].surname
      domm.innerHTML = res.data[0].role

      const categories = await getCategory()
      categoryList.innerHTML = '' // Listeyi temizle
      categories.data.forEach((category) => {
        const listItem = document.createElement('li')
        listItem.className =
          'list-group-item d-flex justify-content-between align-items-center'
        listItem.textContent = category.name

        const deleteButton = document.createElement('button')
        deleteButton.className = 'btn btn-danger btn-sm'
        deleteButton.textContent = 'Sil'
        deleteButton.addEventListener('click', async () => {
          try {
            await deleteCategory(category._id)
            loadCategories()
            showSuccessModal(`Kategori "${category.name}" başarıyla silindi.`)
          } catch (error) {
            console.error('Kategori silme hatası:', error)
            showSuccessModal('Kategori silme işlemi başarısız oldu.')
          }
        })

        listItem.appendChild(deleteButton)
        categoryList.appendChild(listItem)
      })
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error)
    }
  }

  document
    .getElementById('accept-add-category-button')
    .addEventListener('click', async () => {
      const categoryName = document.getElementById('category-name').value
      if (categoryName) {
        try {
          await setCategory({ name: categoryName })
          document.getElementById('category-name').value = '' // Giriş alanını temizle
          loadCategories() // Kategorileri yeniden yükle
          showSuccessModal(`Kategori "${categoryName}" başarıyla eklendi.`)
        } catch (error) {
          console.error('Kategori ekleme hatası:', error)
        }
      }
    })

  function showSuccessModal(message) {
    const successMessageElement = document.getElementById('success-message')
    successMessageElement.textContent = message

    const successModal = new bootstrap.Modal(
      document.getElementById('success-modal'),
    )
    successModal.show()

    document.getElementById('success-modal-confirm').onclick = () => {
      window.location.reload()
    }
  }
  await loadCategories()
})
        
document.addEventListener('DOMContentLoaded', async function () {
  const taxRateList = document.getElementById('tax-rate-list')

  // Vergi oranlarını getirme ve listeleme
  async function loadTaxRates() {
    try {
      const taxRates = await getTaxRate()
      taxRateList.innerHTML = '' // Listeyi temizle
      taxRates.data.forEach((taxRate) => {
        const listItem = document.createElement('li')
        listItem.className =
          'list-group-item d-flex justify-content-between align-items-center' // Bootstrap sınıfı ekle
        listItem.textContent = `${taxRate.name}: ${taxRate.rate}` // Vergi adını ve oranını listeye ekle

        // Sil butonu oluştur
        const deleteButton = document.createElement('button')
        deleteButton.className = 'btn btn-danger btn-sm' // Bootstrap stilini ekle
        deleteButton.textContent = 'Sil'
        deleteButton.addEventListener('click', async () => {
          try {
            await deleteTaxRate(taxRate._id) // Vergi oranını sil
            loadTaxRates() // Vergi oranlarını yeniden yükle
            showSuccessModal(`Vergi oranı "${taxRate.name}" başarıyla silindi.`)
          } catch (error) {
            console.error('Vergi oranı silme hatası:', error)
            showSuccessModal('Vergi oranı silme işlemi başarısız oldu.')
          }
        })

        listItem.appendChild(deleteButton) // Sil butonunu liste öğesine ekle
        taxRateList.appendChild(listItem) // Liste öğesini listeye ekle
      })
    } catch (error) {
      console.error('Vergi oranları yüklenirken hata oluştu:', error)
    }
  }

  document
    .getElementById('accept-add-tax-rate-button')
    .addEventListener('click', async () => {
      const taxRateValue = document.getElementById('tax-rate-value').value
      const taxRateName = document.getElementById('tax-rate-name').value
      console.log(taxRateValue)
      if (taxRateValue && taxRateName) {
        try {
          await setTaxRate({ name: taxRateName, rate: Number(taxRateValue) })
          document.getElementById('tax-rate-value').value = ''
          document.getElementById('tax-rate-name').value = ''
          loadTaxRates()
          showSuccessModal(
            `Vergi "${taxRateName}" oranı "${taxRateValue}" başarıyla eklendi.`,
          )
        } catch (error) {
          console.error('Vergi oranı ekleme hatası:', error)
        }
      }
    })

  function showSuccessModal(message) {
    const successMessageElement = document.getElementById('success-message')
    successMessageElement.textContent = message

    const successModal = new bootstrap.Modal(
      document.getElementById('success-modal'),
    )
    successModal.show()

    document.getElementById('success-modal-confirm').onclick = () => {
      window.location.reload()
    }
  }
  await loadTaxRates()
})

document.addEventListener('DOMContentLoaded', async function () {
  const paymentTypeList = document.getElementById('payment-type-list')

  async function loadPaymentTypes() {
    try {
      const paymentTypes = await getPaymentType()
      paymentTypeList.innerHTML = '' // Listeyi temizle
      paymentTypes.data.forEach((paymentType) => {
        const listItem = document.createElement('li')
        listItem.className =
          'list-group-item d-flex justify-content-between align-items-center'
        listItem.textContent = `Ödeme Türü: ${paymentType.name}`

        const deleteButton = document.createElement('button')
        deleteButton.className = 'btn btn-danger btn-sm'
        deleteButton.textContent = 'Sil'
        deleteButton.addEventListener('click', async () => {
          try {
            await deletePaymentType(paymentType._id)
            await loadPaymentTypes() // Listeyi yeniden yükle
            showSuccessModal(
              `Ödeme türü "${paymentType.type}" başarıyla silindi.`,
            )
          } catch (error) {
            console.error('Ödeme türü silme hatası:', error)
            showSuccessModal('Ödeme türü silme işlemi başarısız oldu.')
          }
        })

        listItem.appendChild(deleteButton)
        paymentTypeList.appendChild(listItem)
      })
    } catch (error) {
      console.error('Ödeme türleri yüklenirken hata oluştu:', error)
    }
  }

  // Modal açıldığında input alanını temizle
  const addPaymentTypeModal = document.getElementById('addPaymentTypeModal')
  addPaymentTypeModal.addEventListener('show.bs.modal', function () {
    const paymentTypeInput = document.getElementById('payment-type-name')
    if (paymentTypeInput) {
      paymentTypeInput.value = '' // Input alanını temizle
    } else {
      console.error('payment-type-name öğesi bulunamadı.')
    }
  })

  document
    .getElementById('accept-add-payment-type-button')
    .addEventListener('click', async () => {
      const paymentTypeInput = document.getElementById('payment-type-name')
      if (paymentTypeInput) {
        const paymentTypeValue = paymentTypeInput.value
        if (paymentTypeValue) {
          try {
            await setPaymentType({ name: paymentTypeValue })
            await loadPaymentTypes() // Listeyi güncelle
            showSuccessModal(
              `Ödeme türü "${paymentTypeValue}" başarıyla eklendi.`,
            )
          } catch (error) {
            console.error('Ödeme türü ekleme hatası:', error)
          }
        } else {
          console.error('Ödeme tipi adı boş olamaz.')
        }
      } else {
        console.error('payment-type-name öğesi bulunamadı.')
      }
    })

  function showSuccessModal(message) {
    const successMessageElement = document.getElementById('success-message')
    successMessageElement.textContent = message

    const successModal = new bootstrap.Modal(
      document.getElementById('success-modal'),
    )
    successModal.show()

    document.getElementById('success-modal-confirm').onclick = () => {
      window.location.reload()
    }
  }

  await loadPaymentTypes() // Ödeme türlerini yükle
})

document.addEventListener('DOMContentLoaded', async function () {
  const authorizedPersonList = document.getElementById('authorized-person-list');
  const addAuthorizedPersonModalElement = document.getElementById(
    'addAuthorizedPersonModal',
  );
  const authorizedPersonNameInput = document.getElementById(
    'authorized-person-name',
  );
  const authorizedPersonPhoneInput = document.getElementById(
    'authorized-person-phone',
  );
  const authorizedPersonEmailInput = document.getElementById(
    'authorized-person-email',
  );
  const successModalElement = document.getElementById('success-modal');
  const successMessageElement = document.getElementById('success-message');

  const addAuthorizedPersonModal = new bootstrap.Modal(
    addAuthorizedPersonModalElement,
  );

  let authorizedPersons = [];

  async function loadAuthorizedPersons() {
    try {
      const response = await getAuthorizedPerson();
      authorizedPersons = response?.data || [];
      authorizedPersonList.innerHTML = '';

      if (authorizedPersons.length > 0) {
        authorizedPersons.forEach((authorizedPerson) => {
          const listItem = document.createElement('li');
          listItem.className =
            'list-group-item d-flex justify-content-between align-items-center';
          listItem.textContent = `Yetkili Kişi: ${authorizedPerson.name}`;

          const deleteButton = document.createElement('button');
          deleteButton.className = 'btn btn-danger btn-sm';
          deleteButton.textContent = 'Sil';
          deleteButton.addEventListener('click', async () => {
            try {
              await deleteAuthorizedPerson(authorizedPerson._id); // Silme işlemi
              await loadAuthorizedPersons(); // Listeyi yeniden yükle
              showSuccessModal(
                `Yetkili kişi "${authorizedPerson.name}" başarıyla silindi.`,
              );
            } catch (error) {
              console.error('Yetkili kişi silme hatası:', error);
              showErrorSwal('Yetkili kişi silme işlemi başarısız oldu.');
            }
          });

          listItem.appendChild(deleteButton);
          authorizedPersonList.appendChild(listItem);
        });
      } else {
        console.error('Yetkili kişiler verisi bulunamadı.');
      }
    } catch (error) {
      console.error('Yetkili kişiler yüklenirken hata oluştu:', error);
    }
  }

  // Modal açıldığında input alanlarını temizleme
  addAuthorizedPersonModalElement.addEventListener('show.bs.modal', function () {
    if (authorizedPersonNameInput) {
      authorizedPersonNameInput.value = '';
      authorizedPersonPhoneInput.value = '';
      authorizedPersonEmailInput.value = '';
    }
  });

  const addAuthorizedPersonButton = document.getElementById(
    'accept-add-authorized-person-button',
  );
  if (addAuthorizedPersonButton) {
    addAuthorizedPersonButton.addEventListener('click', async () => {
      const name = authorizedPersonNameInput.value.trim();
      const phone = authorizedPersonPhoneInput.value.trim();
      const email = authorizedPersonEmailInput.value.trim();

      if (name && phone && email) {
        // Butonu devre dışı bırak
        addAuthorizedPersonButton.disabled = true;

        // Daha önce eklenmiş mi kontrol et
        const isDuplicate = authorizedPersons.some(
          (person) => person.name === name && person.phone === phone && person.email === email,
        );

        if (isDuplicate) {
          showErrorSwal('Bu yetkili kişi zaten eklenmiş.');
          addAuthorizedPersonButton.disabled = false; // Butonu tekrar etkinleştir
        } else {
          try {
            await setAuthorizedPerson({ name, phone, email });
            await loadAuthorizedPersons(); // Listeyi güncelle
            showSuccessModal(`Yetkili kişi "${name}" başarıyla eklendi.`);
          } catch (error) {
            console.error('Yetkili kişi ekleme hatası:', error);
            showErrorSwal('Yetkili kişi ekleme işlemi başarısız oldu.');
          } finally {
            // İşlem tamamlandığında butonu tekrar etkinleştir
            addAuthorizedPersonButton.disabled = false;
          }
        }
      } else {
        showErrorSwal('Lütfen tüm alanları doldurduğunuzdan emin olun.');
      }
    });
  }

  function showSuccessModal(message) {
    if (successMessageElement) {
      successMessageElement.textContent = message;

      const successModal = new bootstrap.Modal(successModalElement);
      successModal.show();

      document.getElementById('success-modal-confirm').onclick = () => {
        window.location.reload();
      };
    } else {
      console.error('Başarı mesajı öğesi bulunamadı.');
    }
  }

  function showErrorSwal(message) {
    Swal.fire({
      icon: 'error',
      title: 'Hata',
      text: message,
      confirmButtonText: 'Tamam',
    });
  }

  await loadAuthorizedPersons();
})

document.addEventListener('DOMContentLoaded', async function () {
  const currencyList = document.getElementById('currency-list');

  let currencies = []; // Mevcut para birimlerini saklamak için değişken

  // Para birimlerini getirme ve listeleme
  async function loadCurrencies() {
    try {
      const response = await getCurrency();
      currencies = response?.data || [];
      currencyList.innerHTML = ''; // Listeyi temizle
      currencies.forEach((currency) => {
        const listItem = document.createElement('li');
        listItem.className =
          'list-group-item d-flex justify-content-between align-items-center'; // Bootstrap sınıfı ekle
        listItem.textContent = currency.name; // Para birimi adını listeye ekle

        // Sil butonu oluştur
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm'; // Bootstrap stilini ekle
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', async () => {
          try {
            await deleteCurrency(currency._id); // Para birimini sil
            await loadCurrencies(); // Para birimlerini yeniden yükle
            showSuccessModal(`Para birimi "${currency.name}" başarıyla silindi.`);
          } catch (error) {
            console.error('Para birimi silme hatası:', error);
            showErrorSwal('Para birimi silme işlemi başarısız oldu.');
          }
        });

        listItem.appendChild(deleteButton); // Sil butonunu liste öğesine ekle
        currencyList.appendChild(listItem); // Liste öğesini listeye ekle
      });
    } catch (error) {
      console.error('Para birimleri yüklenirken hata oluştu:', error);
    }
  }

  const addCurrencyButton = document.getElementById('accept-add-currency-button');

  addCurrencyButton.addEventListener('click', async () => {
    const currencyNameInput = document.getElementById('currency-name');
    const currencyName = currencyNameInput.value.trim();

    if (currencyName) {
      // Butonu devre dışı bırak
      addCurrencyButton.disabled = true;

      // Daha önce eklenmiş mi kontrol et
      const isDuplicate = currencies.some((currency) => currency.name === currencyName);

      if (isDuplicate) {
        showErrorSwal('Bu para birimi zaten eklenmiş.');
        addCurrencyButton.disabled = false; // Butonu tekrar etkinleştir
      } else {
        try {
          await setCurrency({ name: currencyName });
          currencyNameInput.value = ''; // Giriş alanını temizle
          await loadCurrencies(); // Para birimlerini yeniden yükle
          showSuccessModal(`Para birimi "${currencyName}" başarıyla eklendi.`);
        } catch (error) {
          console.error('Para birimi ekleme hatası:', error);
          showErrorSwal('Para birimi ekleme işlemi başarısız oldu.');
        } finally {
          // İşlem tamamlandığında butonu tekrar etkinleştir
          addCurrencyButton.disabled = false;
        }
      }
    } else {
      showErrorSwal('Lütfen para birimi adını giriniz.');
    }
  });

  function showSuccessModal(message) {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = message;

    const successModal = new bootstrap.Modal(document.getElementById('success-modal'));
    successModal.show();

    document.getElementById('success-modal-confirm').onclick = () => {
      window.location.reload();
    };
  }

  function showErrorSwal(message) {
    Swal.fire({
      icon: 'error',
      title: 'Hata',
      text: message,
      confirmButtonText: 'Tamam',
    });
  }

  await loadCurrencies();
})
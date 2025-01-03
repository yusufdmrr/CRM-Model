async function setCustomer(customer) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/setCustomer',
      customer,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Müşteri ekleme hatası:', error)
    throw error
  }
}

async function deleteCustomer(customerId) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/deleteCustomer',
      { customerId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Müşteri silme hatası:', error)
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

async function updateCustomer(customerId, customerData) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/crm/customer/updateCustomer',
      { customerId, ...customerData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_TOKEN_HERE',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Müşteri güncelleme hatası:', error)
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

document.addEventListener('DOMContentLoaded', async function () {

  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('id');

  if (customerId) {
    const customer = await getCustomer(customerId);
    displayCustomerDetails(customer);
  }

  document.getElementById('update-customer-button').addEventListener('click', () => { $('#update-customer').modal('show'); });

  document.getElementById('add-update-customer-button').addEventListener('click', async () => {
    const updatedCustomerData = {
      companyName: document.getElementById('update-company-name').value,
      taxNumber: document.getElementById('update-tax-number').value,
      taxOffice: document.getElementById('update-tax-office').value,
      address: document.getElementById('update-address').value,
      email: document.getElementById('update-email').value,
      phone: document.getElementById('update-phone').value,
      sector: document.getElementById('update-sector').value,
      workingLanguage: document.getElementById('update-working-language').value,
      customerStatus: document.getElementById('update-customer-status').value,
      notes: document.getElementById('update-notes').value,
      authorizedPerson: {
        name: document.getElementById('update-authorized-person').value,
        phone: document.getElementById('update-authorized-phone').value,
        email: document.getElementById('update-authorized-email').value,
      },
    };

    try {
      await updateCustomer(customerId, updatedCustomerData);
      $('#update-customer').modal('hide');
      Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Müşteri bilgileri başarıyla güncellendi.',
        confirmButtonText: 'Tamam',
      }).then(() => {
        location.reload(); // Sayfayı yenile
      });
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Müşteri bilgileri güncellenirken bir sorun oluştu.',
      });
    }
  });

  document.getElementById('delete-customer-button').addEventListener('click', async () => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu müşteriyi silmek üzeresiniz. Bu işlem geri alınamaz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Hayır, vazgeç',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCustomer(customerId);
          Swal.fire({
            icon: 'success',
            title: 'Silindi!',
            text: 'Müşteri başarıyla silindi.',
            confirmButtonText: 'Tamam',
          }).then(() => {
            window.location.href = 'projects-list.html'; // Silme işleminden sonra yönlendirme
          });
        } catch (error) {
          console.error('Silme hatası:', error);
          Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Müşteri silinirken bir sorun oluştu.',
          });
        }
      }
    });
  });

  document.getElementById('go-back-button').addEventListener('click', function () {
    window.location.href = "http://127.0.0.1:5502/yusuf/front/template/pages/projects/projects-list.html";
 });

});

function displayCustomerDetails(customer) {
  document.getElementById('display-company-name').innerText =
    customer.companyName
  document.getElementById('display-company-type').innerText =
    customer.companyType
  document.getElementById('display-tax-number').innerText = customer.taxNumber
  document.getElementById('display-tax-office').innerText = customer.taxOffice
  document.getElementById('display-address').innerText = customer.address
  document.getElementById('display-email').innerText = customer.email
  document.getElementById('display-phone').innerText = customer.phone
  document.getElementById('display-sector').innerText = customer.sector
  document.getElementById('display-working-language').innerText =
    customer.workingLanguage
  document.getElementById('display-customer-status').innerText =
    customer.customerStatus
  document.getElementById('display-customer-notes').innerText =
    customer.customerNotes
  document.getElementById('display-authorized-person').innerText =
    customer.authorizedPerson.name
  document.getElementById('display-authorized-phone').innerText =
    customer.authorizedPerson.phone
  document.getElementById('display-authorized-email').innerText =
    customer.authorizedPerson.email

  document.getElementById('update-company-name').value = customer.companyName
  document.getElementById('update-company-type').value = customer.companyType
  document.getElementById('update-tax-number').value = customer.taxNumber
  document.getElementById('update-tax-office').value = customer.taxOffice
  document.getElementById('update-address').value = customer.address
  document.getElementById('update-email').value = customer.email
  document.getElementById('update-phone').value = customer.phone
  document.getElementById('update-sector').value = customer.sector
  document.getElementById('update-working-language').value =
    customer.workingLanguage
  document.getElementById('update-customer-status').value =
    customer.customerStatus
  document.getElementById('update-notes').value = customer.customerNotes
  document.getElementById('update-authorized-person').value =
    customer.authorizedPerson.name
  document.getElementById('update-authorized-phone').value =
    customer.authorizedPerson.phone
  document.getElementById('update-authorized-email').value =
    customer.authorizedPerson.email
}

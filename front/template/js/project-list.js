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
  
  const customerFilter = document.getElementById('customer-filter');
  const searchInput = document.querySelector('input[type="search"]');
  const searchButton = document.querySelector('button[type="submit"]');
  const customersTableBody = document.getElementById('customers-table-body');
  const authorizedPersonSelect = document.getElementById('authorized-person');

  let authorizedPersons = [];

  async function loadCustomers() {
    try {
      // Müşteri bilgilerini al
      const customers = await getCustomer();
      console.log("Gelen müşteriler:", customers);
  
      // Filtreleme
      const filterValue = customerFilter.value || '';
      const searchTerm = (searchInput ? searchInput.value : '').toLowerCase();
  
      const filteredCustomers = customers.filter((customer) => {
        const isActiveMatch =
          (filterValue === 'active' && customer.customerStatus === 'Aktif') ||
          (filterValue === 'inactive' && customer.customerStatus === 'Pasif') ||
          filterValue === '';
  
        const isSearchMatch = customer.companyName
          .toLowerCase()
          .includes(searchTerm);
  
        return isActiveMatch && isSearchMatch;
      });
  
      // Tabloyu temizle ve doldur
      customersTableBody.innerHTML = '';
  
      filteredCustomers.forEach((customer) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${customer.companyName}</td>
          <td>${customer.taxNumber}</td>
          <td>${customer.phone}</td>
          <td>${customer.address}</td>
          <td>${customer.customerStatus}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="window.location.href='customerdetail.html?id=${customer._id}'">
              Detay
            </button>
          </td>
        `;
        customersTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Müşteri yükleme hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Müşteri bilgileri yüklenirken bir sorun oluştu.',
      });
    }
  }  

  async function loadAuthorizedPersons() {
    try {
      const response = await getAuthorizedPerson();
      authorizedPersons = response.data ? response.data : [];

      authorizedPersonSelect.innerHTML =
        '<option value="" disabled selected>Yetkili kişi seçin</option>';
      authorizedPersons.forEach((person) => {
        const option = document.createElement('option');
        option.value = person.name; 
        option.dataset.id = person._id; 
        option.textContent = person.name;
        authorizedPersonSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Yetkili kişi bilgilerini yükleme hatası:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Yetkili kişi bilgileri yüklenirken bir sorun oluştu.',
      });
    }
  }

  authorizedPersonSelect.addEventListener('change', function () {
    const selectedPersonName = authorizedPersonSelect.value;

    if (selectedPersonName) {
      const selectedPerson = authorizedPersons.find(
        (person) => person.name === selectedPersonName
      );

      if (selectedPerson) {
        document.getElementById('authorized-phone').value =
          selectedPerson.phone || '';
        document.getElementById('authorized-email').value =
          selectedPerson.email || '';
        document.getElementById('authorized-id').value = selectedPerson._id;
      }
    }
  });

  customerFilter.addEventListener('change', loadCustomers);

  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    loadCustomers();
  });

  document.getElementById('add-customer-button').addEventListener('click', async () => {
      const customerData = {
        companyName: document.getElementById('company-name').value,
        companyType: document.getElementById('company-type').value,
        taxNumber: document.getElementById('tax-number').value,
        taxOffice: document.getElementById('tax-office').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        sector: document.getElementById('sector').value,
        workingLanguage: document.getElementById('working-language').value,
        customerStatus: document.getElementById('customer-status').value,
        customerNotes: document.getElementById('customer-notes').value,

        authorizedPerson: {
          name: document.getElementById('authorized-person').value,
          phone: document.getElementById('authorized-phone').value,
          email: document.getElementById('authorized-email').value,
        },
      };

      try {
        await setCustomer(customerData);

        Swal.fire({
          icon: 'success',
          title: 'Başarılı!',
          text: 'Müşteri başarıyla eklendi.',
          confirmButtonText: 'Tamam',
        }).then(() => {
          location.reload();
        });
      } catch (error) {
        console.error('Müşteri ekleme hatası:', error);
        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          text: 'Müşteri eklenirken bir sorun oluştu.',
        });
      }
    });

  await loadCustomers();
  await loadAuthorizedPersons();

});
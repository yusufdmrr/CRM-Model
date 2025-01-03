document.addEventListener('DOMContentLoaded', function () {
  // Header içeriğini yükle
  var header = document.getElementById('static-header');
  fetch('../static-pages/header.html')
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;

      // Header yüklendikten sonra, payload'dan kullanıcı bilgilerini al ve HTML'ye yerleştir
      loadUserInfo(); 
    })
    .catch((error) => console.error('Error loading header:', error));

  // Sidebar içeriğini yükle
  var sidebar = document.getElementById('static-sidebar');
  fetch('../static-pages/sidebar.html')
    .then((response) => response.text())
    .then((data) => {
      sidebar.innerHTML = data;
    })
    .catch((error) => console.error('Error loading sidebar:', error));

  // Footer içeriğini yükle
  var footer = document.getElementById('static-footer');
  fetch('../static-pages/footer.html')
    .then((response) => response.text())
    .then((data) => {
      footer.innerHTML = data;
    })
    .catch((error) => console.error('Error loading footer:', error));
});

// JWT'den kullanıcı bilgilerini al ve HTML'ye yerleştir
function loadUserInfo() {
  const jwt = localStorage.getItem('jwt'); // JWT token'ı localStorage'dan alıyoruz
  
  if (jwt && jwt.split('.').length === 3) {
    try {
      const parts = jwt.split('.');
      const payload = JSON.parse(decodeURIComponent(escape(window.atob(parts[1]))));

      // Kullanıcı bilgilerini payload'dan al
      const userName = payload.name;  // Kullanıcı adı
      const userSurname = payload.surname;  // Kullanıcı soyadı
      const userRole = payload.role;  // Kullanıcı rolü

      // HTML elementlerini al
      const userNameElement = document.getElementById('user-name');
      const userDepartmanElement = document.getElementById('user-departman');

      if (userNameElement && userDepartmanElement) {
        userNameElement.textContent = userRole;  // Kullanıcı rolünü göster
        userDepartmanElement.textContent = `${userName} ${userSurname}`;  // Kullanıcı adı ve soyadını göster
      }

    } catch (error) {
      console.error('Geçersiz JWT formatı:', error);
    }
  } else {
    console.log('JWT bulunamadı veya geçersiz formatta.');
  }
}


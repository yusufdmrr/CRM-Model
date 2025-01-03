function getJWTFromCookie() {
    const name = 'token=';
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim(); 
      if (cookie.indexOf(name) === 0) {
        return decodeURIComponent(cookie.substring(name.length, cookie.length)); 
      }
    }
    return null;
}
const jwt = getJWTFromCookie();
  
async function setUser(user) {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/crm/user/setUser',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt, // JWT token'ı buraya ekleyin
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Kullanıcı ekleme hatası:', error);
      throw error;
    }
}
  
async function login(credentials) {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/crm/user/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const token = response.data.data;
      document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
      console.log("JWT Token Set:", document.cookie);
  
      // Beni Hatırla? seçeneği işaretli ise bilgileri sakla
      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
  
      return response.data; 
    } catch (error) {
      console.error('Giriş hatası:', error);
      throw error;
    }
}
  
async function changePassword(email) {
    try {
      console.log("yusufbaba");
      const response = await axios.post(
        'http://localhost:3001/api/v1/crm/user/changePassword',
        email,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      throw error;
    }
}

async function setNewPassword(email, newPassword) {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/crm/user/setNewPassword',
        { email, newPassword }, 
        {
          headers: {
            'Content-Type': 'application/json', 
            Authorization: 'Bearer ' + jwt,  
          },
        }
      );
  
      return response.data; 
  
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);  
      throw error; 
    }
}  

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email'); 
  
    if (email) {
      document.getElementById('email').value = email;
    }
});
  
document.getElementById('save-password-button').addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;

    if (!email || !newPassword || !confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Lütfen tüm alanları doldurun.',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Yeni şifreler birbirleriyle uyuşmuyor.',
      });
      return;
    }

    try {
      const response = await setNewPassword(email, newPassword);
      console.log('Şifre değiştirme yanıtı:', response);

      if (response && response.message && response.status === undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Başarı',
          text: response.message || 'Şifreniz başarıyla değiştirildi.',
        }).then(() => {
          window.location.href = 'file:///C:/Users/Demir/Desktop/Yusuf2/yusuf/front/template/pages/users/login-page.html';
        });
      } else {
        // Yanıtla ilgili hata mesajı
        const errorMsg = response && response.message ? response.message : 'Şifre değiştirilirken bir hata oluştu.';
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: errorMsg,
        });
      }
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      let errorMessage = 'Şifre değiştirilirken bir hata oluştu.';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.detail || errorMessage;
      }

      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: errorMessage,
      });
    }
});
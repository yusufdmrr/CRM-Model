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

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('rememberMe') === 'true') {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    document.getElementById('email').value = savedEmail;
    document.getElementById('signin-password').value = savedPassword;
    document.getElementById('rememberMe').checked = true; 
  }

  document.getElementById('button-addon2').addEventListener('click', function() {
    const passwordField = document.getElementById('signin-password');
    const passwordType = passwordField.type;

    if (passwordType === 'password') {
      passwordField.type = 'text';  
      this.innerHTML = '<i class="ri-eye-line align-middle"></i>';  
    } else {
      passwordField.type = 'password';  
      this.innerHTML = '<i class="ri-eye-off-line align-middle"></i>'; 
    }
  });

  document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('signin-password').value;
    const rememberMe = document.getElementById('rememberMe').checked; 

    console.log("Email:", email);
    console.log("Password:", password);

    login({ email, password })
      .then((data) => {
        console.log('Giriş başarılı!', data);

        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }

        Swal.fire({
          icon: 'success',
          title: 'Giriş Başarılı!',
          text: 'Giriş işlemi başarıyla tamamlandı.',
          confirmButtonText: 'Tamam'
        }).then(() => {
          window.location.href = 'http://127.0.0.1:5502/yusuf/front/template/pages/projects/block-details.html'; 
        });
      })
      .catch((error) => {
        console.error('Giriş hatası:', error);

        Swal.fire({
          icon: 'error',
          title: 'Giriş Hatası',
          text: 'Giriş işlemi sırasında bir hata oluştu.',
        });
      });
  });

  const registerBtn = document.getElementById('register-btn');
  const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

  registerBtn.addEventListener('click', () => {
    registerModal.show();
  });

  const registerSubmitBtn = document.getElementById('register-submit-btn');
  const registerPassword = document.getElementById('register-password');

  registerPassword.addEventListener('input', () => {
    const password = registerPassword.value;

    if (password.length < 4) {
      registerSubmitBtn.disabled = true;
      registerSubmitBtn.title = "Şifre en az 4 karakter olmalı";
    } else {
      registerSubmitBtn.disabled = false;
      registerSubmitBtn.title = "";
    }
  });

  registerSubmitBtn.addEventListener('click', async () => {
    const name = document.getElementById('register-name').value;
    const surname = document.getElementById('register-surname').value;
    const role = document.getElementById('register-role').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const user = { name, surname, role, email, password };

    try {
      const response = await setUser(user);
      console.log('Kayıt başarılı!', response);

      Swal.fire({
        icon: 'success',
        title: 'Kayıt başarılı!',
        text: 'Kayıt işlemi başarıyla tamamlandı.',
      }).then(() => {
        window.location.reload();
      });

      registerModal.hide();
    } catch (error) {
      console.error('Kayıt hatası:', error);

      Swal.fire({
        icon: 'error',
        title: 'Kayıt başarısız!',
        text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('forgot-password-btn').addEventListener('click', function () {
    const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
    forgotPasswordModal.show();
  });

  document.getElementById('send-reset-email-btn').addEventListener('click', async function () {
    const email = document.getElementById('forgot-email').value;

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Lütfen geçerli bir e-posta adresi girin.',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/crm/user/changePassword',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'E-posta Gönderildi!',
          text: 'Şifre sıfırlama e-postası adresinize gönderildi.',
        });

        const forgotPasswordModal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
        forgotPasswordModal.hide();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: response.data.message || 'Beklenmedik bir hata oluştu.',
        });
      }
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      const errorMessage = error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: errorMessage,
      });
    }
  });
});
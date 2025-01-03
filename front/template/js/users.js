function removeUndefinedNaNAndEmptyStrings(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        // İç içe geçmiş bir obje ise, bu objeyi de işleyin
        obj[key] = removeUndefinedNaNAndEmptyStrings(obj[key])
      } else if (
        obj[key] === undefined ||
        (typeof obj[key] === 'number' && isNaN(obj[key])) ||
        obj[key] === ''
      ) {
        // NaN, undefined veya boş dize ise, bu özelliği kaldırın
        delete obj[key]
      }
    }
  }
  return obj
}

function formatEpochToDate(epochTime) {
  const date = new Date(epochTime) // Epoch zaman damgasını milisaniyeye çevir

  const day = String(date.getDate()).padStart(2, '0') // Gün kısmını 2 basamaklı yap
  const month = String(date.getMonth() + 1).padStart(2, '0') // Ay kısmını 2 basamaklı yap
  const year = date.getFullYear() // Yıl kısmı

  // `gg.aa.yyyy` formatında tarihi döndür
  return `${day}.${month}.${year}`
}

async function toEpochTime(dateString) {
  var date = new Date(dateString)

  var epochTime = date.getTime()

  return epochTime
}

async function getProjectById(userId, projectId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/admin/getProjectById',
      { userId, projectId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('user info hatası', error)
    throw error
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // const userName = document.getElementById('user-name');
    // const userRole = document.getElementById('user-departman');
    // const navbarImage = document.getElementById('navbar-img');

    // let payload;

    // if (jwt && jwt.split('.').length === 3) {
    //     console.log('Cookie içindeki JWT:', jwt);
    //     try {
    //         const parts = jwt.split('.');
    //         const header = JSON.parse(atob(parts[0]));
    //         payload = JSON.parse(decodeURIComponent(escape(window.atob(parts[1]))));

    //         console.log('Header:', header);
    //         console.log('Payload:', payload);
    //     } catch (error) {
    //         console.error('Geçersiz JWT formatı:', error);
    //         window.location.href = '/giris';
    //     }
    // } else {
    //     window.location.href = '/giris';
    //     console.log('JWT cookie bulunamadı veya geçersiz formatta.');
    // }

    // let userId = payload.id
    let userId = '123'

    // const [projectNames] = await Promise.all([

    //     getProjectNames(userId)
    // ]);

    // hidden columns
    // new gridjs.Grid({
    //     columns: [{
    //         name: "Date",
    //         hidden: true,
    //     }, {
    //         name: "Name",
    //         width: "150px",
    //     }, {
    //         name: "Email",
    //         width: "200px",
    //     }, {
    //         name: "ID",
    //         width: "150px",
    //     }, {
    //         name: "Price",
    //         width: "100px",
    //     }, {
    //         name: "Quantity",
    //         width: "100px",
    //     }, {
    //         name: "Total",
    //         width: "100px",
    //     }],
    //     sort: true,
    //     search: true,
    //     pagination: true,
    //     data: [
    //         ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
    //         ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
    //         ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
    //         ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
    //         ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
    //     ],
    // }).render(document.getElementById("grid-hidden-column"));;
    // hidden columns

    document
      .getElementById('add-user')
      .addEventListener('click', async function () {
        // Input değerlerini toplama
        const nameInput = document.getElementById('name').value
        const surnameInput = document.getElementById('surname').value
        const roleInput = document.getElementById('role').value
        const emailInput = document.getElementById('email').value
        const passwordInput = document.getElementById('password').value

        const formData = {
          userId,
          name: nameInput,
          surname: surnameInput,
          role: roleInput,
          email: emailInput,
          password: passwordInput,
        }

        Swal.fire({
          title: 'İşlemi Onaylıyor musunuz?',
          text: 'Kullanıcı bilgilerini kaydetmek istediğinize emin misiniz?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Evet, Kaydet',
          cancelButtonText: 'Vazgeç',
        }).then((result) => {
          if (result.isConfirmed) {
            // İsteği gönder
            axios
              .post(
                'http://localhost:3001/api/v1/crm/admin/setUser',
                formData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt,
                  },
                },
              )
              .then((response) => {
                // İşlem tamamlandı bildirimi
                Swal.fire({
                  title: 'Tamamlandı!',
                  text: 'Kullanıcı bilgileri başarıyla kaydedildi.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  //window.location.href = `apartment-details.html?id=${apartmentId}`; // Yönlendir
                })
              })
              .catch((error) => {
                console.log(error)
                if (error.response) {
                  const errorMessage = error.response.data.msg
                  const errorDetail = error.response.data.detail
                  Swal.fire({
                    title: 'Hata!',
                    text: errorMessage + '---' + errorDetail,
                    icon: 'error',
                    confirmButtonText: 'Tamam',
                  })
                } else {
                  // Ağ hatası veya başka bir hata
                  console.error('Hata:', error)
                  Swal.fire({
                    title: 'Hata!',
                    text: 'Bir hata oluştu.',
                    icon: 'error',
                    confirmButtonText: 'Tamam',
                  })
                }
              })
          }
        })
      })

    // document.getElementById("logout-button").addEventListener('click', async function (e) {
    //     // Formdaki verileri alın
    //     try {
    //         const response = await axios.post('http://localhost:3001/api/v1/aslan/admin/logout');

    //         if (response.status === 200) {
    //             document.cookie = `token=${response.data.data}`;
    //             window.location.href = '/giris';
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             const errorMessage = error.response.data.msg;
    //         } else {
    //             console.error('Hata:', error);
    //         }
    //     }
    // }
    // );

    function hideLoader() {
      const loader = document.getElementById('loader')
      loader.classList.add('d-none')
    }

    hideLoader()
  } catch (error) {
    console.error('Form verileri kaydedilirken bir hata oluştu:', error)
  }
})

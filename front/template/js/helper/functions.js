function getJWTFromCookie() {
  const name = 'token='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  return null
}

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

async function fillDropDown(data, element, textContent) {
  try {
    // "Seçiniz" gibi bir option elementi oluştur ve select elementine ekle
    let defaultOptionElementi = document.createElement('option')
    defaultOptionElementi.value = '' // Boş değer
    defaultOptionElementi.textContent = 'Seçiniz'
    defaultOptionElementi.disabled = true // Seçilemez yap
    defaultOptionElementi.selected = true // Varsayılan olarak seçili yapma
    element.appendChild(defaultOptionElementi)

    data.forEach(function (personel) {
      let optionElementi = document.createElement('option')
      optionElementi.value = personel['_id']
      optionElementi.textContent = personel[textContent]
      element.appendChild(optionElementi)
    })
  } catch (error) {
    console.error('Seçenekleri alma hatası:', error)
    throw error
  }
}

async function createPostTrigger(
  url,
  postData,
  sweetTitle,
  sweetMessage,
  afterLocation,
) {
  // eventListenerType = 'click' , 'change' vs vs

  console.log('poooo', postData)

  axios
    .post(url, postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    })
    .then((response) => {
      Swal.fire({
        title: sweetTitle,
        text: sweetMessage,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = afterLocation
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response) {
        const errorMessage = error.response.data.msg
        const errorDetail = error.response.data.detail
        Swal.fire({
          title: 'Hata!',
          text: error.response.data.msg + '---' + error.response.data.detail,
          icon: 'error',
          confirmButtonText: 'Tamam',
        })
        showError(errorMessage, errorDetail) // Hata mesajını göster
      } else {
        // Ağ hatası veya başka bir hata
        console.error('Hata:', error)
        Swal.fire({
          title: 'Hata!',
          text: error.response.data.msg + '---' + error.response.data.detail,
          icon: 'error',
          confirmButtonText: 'Tamam',
        })
      }
    })
}

async function fillMultipleDropDown(
  data,
  mainElement,
  subElement,
  mainTextContent,
  subTextContent,
) {
  try {
    data.forEach((item) => {
      const mainOption = document.createElement('option')
      mainOption.value = item._id
      mainOption.text = item[mainTextContent]
      mainElement.appendChild(mainOption)
    })

    mainElement.addEventListener('change', function () {
      subElement.innerHTML =
        '<option value="" disabled selected>Seçiniz</option>'

      const selectedTypeName = mainElement.value

      const selectedData = data.find((item) => item['_id'] === selectedTypeName)

      if (selectedData && selectedData.subValues) {
        selectedData.subValues.forEach((subValue) => {
          const subOption = document.createElement('option')
          subOption.value = subValue['_id']
          subOption.text = subValue[subTextContent]
          subElement.appendChild(subOption)
        })
      }
    })

    if (mainElement.value) {
      mainElement.dispatchEvent(new Event('change'))
    }
  } catch (error) {
    console.error('Seçenekleri alma hatası:', error)
    throw error
  }
}

function fillTableList(dataList, tableBodySelector, keys) {
  const tableBody = document.querySelector(tableBodySelector)
  tableBody.innerHTML = ''
  dataList.forEach((data) => {
    const row = document.createElement('tr')
    const checkboxCell = document.createElement('td')
    checkboxCell.innerHTML = `<input class="form-check-input" type="checkbox" id="checkboxNoLabel1" value="" aria-label="...">`
    row.appendChild(checkboxCell)

    const nameCell = document.createElement('td')
    nameCell.innerHTML = `<div class="d-flex align-items-center gap-2">
                                <div class="lh-1">
                                    <span class="avatar avatar-rounded avatar-sm">
                                        <img src="../assets/images/faces/4.jpg" alt="">
                                    </span>
                                </div>
                                <div>
                                    <span class="d-block fw-semibold" id="full_name">${data.name} ${data.surname}</span>
                                </div>
                            </div>`
    row.appendChild(nameCell)

    keys.forEach((key) => {
      const cell = document.createElement('td')
      cell.innerHTML = `<span class="badge " id="${key}">${data[key]}</span>`
      row.appendChild(cell)
    })

    const actionsCell = document.createElement('td')
    actionsCell.innerHTML = `<div class="btn-list">
                                    <a class="btn btn-sm btn-warning-light btn-icon"><i class="ri-eye-line"></i></a>
                                    <button class="btn btn-sm btn-info-light btn-icon" onclick="openEditModal('${personelId}', '${data._id}')"><i class="ri-pencil-line" data-bs-toggle="modal" data-bs-target="#create-contact-2"></i></button>
                                    <button class="btn btn-sm btn-danger-light btn-icon contact-delete"><i class="ri-delete-bin-line"></i></button>
                                 </div>`
    row.appendChild(actionsCell)

    tableBody.appendChild(row)
  })
}

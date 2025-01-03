const params = new URLSearchParams(window.location.search)
const projectId = params.get('id')

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

async function toEpochTime(dateString) {
  var date = new Date(dateString)

  var epochTime = date.getTime()

  return epochTime
}

async function getProjectDetails(userId, projectId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/admin/getProjectDetails',
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

async function getSubjects(userId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/admin/getSubjects',
      { userId },
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

async function getActionToTasks(userId, taskId) {
  try {
    let response = await axios.post(
      'http://localhost:3001/api/v1/crm/admin/getActionToTasks',
      { userId, taskId },
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

function formatEpochToDate(epochTime) {
  const date = new Date(epochTime) // Epoch zaman damgasını milisaniyeye çevir

  const day = String(date.getDate()).padStart(2, '0') // Gün kısmını 2 basamaklı yap
  const month = String(date.getMonth() + 1).padStart(2, '0') // Ay kısmını 2 basamaklı yap
  const year = date.getFullYear() // Yıl kısmı

  // `gg.aa.yyyy` formatında tarihi döndür
  return `${day}.${month}.${year}`
}

function openAddProgressModal(taskId, tasks) {
  const existTask = tasks.find((task) => task._id === taskId)

  document.getElementById('action-task-id').value = taskId

  const progressBar = document.getElementById('action-progress-bar')

  progressBar.style.width = `${existTask.percentComplete}%`
  progressBar.textContent = `${existTask.percentComplete}%`
}

async function populateTaskActions(taskId) {
  const existActions = await getActionToTasks(
    '6682b5a2865a0e076d54c9a5',
    taskId,
  )

  const actionListDiv = document.getElementById('action-list-div')
  const taskProgressDiv = document.getElementById('task-progress-div')
  taskProgressDiv.style.display = 'block'

  actionListDiv.innerHTML = ''

  function getDayAbbreviation(dayName) {
    // Türkçe gün isimlerini kısaltmaları ile eşleyen bir nesne
    const dayMap = {
      Pazartesi: 'Pzt',
      Salı: 'Sal',
      Çarşamba: 'Çrş',
      Perşembe: 'Prş',
      Cuma: 'Cum',
      Cumartesi: 'Cmt',
      Pazar: 'Pzr',
    }

    // Parametre olarak gönderilen Türkçe gün ismini kısaltma olarak döndür
    return dayMap[dayName] || 'Geçersiz gün ismi' // Geçersiz gün ismi durumunda bir uyarı döndürür
  }

  function addTaskToList(dateKey, tasks) {
    const listItem = document.createElement('li')
    listItem.classList.add('timeline-widget-list')

    const divFlex = document.createElement('div')
    divFlex.classList.add('d-flex', 'align-items-top')

    const divDate = document.createElement('div')
    divDate.classList.add('me-5', 'text-center')

    const dateParts = dateKey.split(' ')
    let numberDay = dateParts[0].split('.')[0]
    const day = dateParts[1]
    if (numberDay.length === 1) {
      numberDay = '0' + numberDay
    }

    divDate.innerHTML = `
            <span class="d-block fs-20 fw-semibold text-primary">${numberDay}</span>
            <span class="d-block fs-12 text-muted">${getDayAbbreviation(
              day,
            )}</span>
        `

    const divContent = document.createElement('div')
    divContent.classList.add(
      'd-flex',
      'flex-wrap',
      'flex-fill',
      'align-items-top',
      'justify-content-between',
    )

    const divInfo = document.createElement('div')
    const avatarDiv = document.createElement('div')

    tasks.forEach((task) => {
      const pTask = document.createElement('p')
      pTask.classList.add(
        'mb-1',
        'text-truncate',
        'timeline-widget-content',
        'text-wrap',
      )
      pTask.textContent = `${task.subjectName} - ${task.subSubjectName} görevi`
      divInfo.appendChild(pTask)

      const pDescription = document.createElement('p')
      pDescription.classList.add('mb-4', 'fs-12', 'lh-1', 'text-muted')
      pDescription.innerHTML = `<span class="badge bg-primary-transparent ms-2">Açıklama: ${task.description}</span>`
      divInfo.appendChild(pDescription)

      const pInfo = document.createElement('p')
      pInfo.classList.add('mb-4', 'fs-12', 'lh-1', 'text-muted')
      pInfo.innerHTML = `${formatEpochToDate(task.date)}<span class="badge ${
        task.type === 'completed'
          ? 'bg-success-transparent'
          : 'bg-warning-transparent'
      } ms-2">${
        task.type === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'
      }</span>`
      divInfo.appendChild(pInfo)

      avatarDiv.classList.add('avatar-list-stacked', 'col-3')

      // Avatar URL'lerini ekle
      const avatarUrls = task.photos || []
      if (avatarUrls.length <= 3) {
        avatarUrls.forEach((url) => {
          const span = document.createElement('span')
          span.classList.add('avatar')
          span.innerHTML = `<a data-fancybox="gallery-${dateKey.replace(
            /\s+/g,
            '-',
          )}" href="../../../../public/${url}"><img src="../../../../public/${url}" alt="img"></a>`
          avatarDiv.appendChild(span)
        })
      } else {
        for (let i = 0; i < 3; i++) {
          const span = document.createElement('span')
          span.classList.add('avatar')
          span.innerHTML = `<a data-fancybox="gallery-${dateKey.replace(
            /\s+/g,
            '-',
          )}" href="../../../../public/${
            avatarUrls[i]
          }"><img src="../../../../public/${avatarUrls[i]}" alt="img"></a>`
          avatarDiv.appendChild(span)
        }
        const extraAvatars = avatarUrls.length - 3
        const span = document.createElement('a')
        span.classList.add('avatar', 'bg-primary', 'text-fixed-white')
        span.href = 'javascript:void(0);'
        span.textContent = `+${extraAvatars}`
        avatarDiv.appendChild(span)
      }
    })

    $(document).ready(function () {
      $('[data-fancybox]').fancybox({
        loop: true,
        buttons: [
          'zoom',
          'slideShow',
          'fullScreen',
          'download',
          'thumbs',
          'close',
        ],
      })
    })

    divFlex.appendChild(divDate)
    divFlex.appendChild(divContent)
    divContent.appendChild(divInfo)
    divContent.appendChild(avatarDiv)
    listItem.appendChild(divFlex)

    actionListDiv.appendChild(listItem)
  }

  const taskReport = existActions.data
  for (const dateKey in taskReport) {
    if (taskReport.hasOwnProperty(dateKey)) {
      const tasks = taskReport[dateKey]
      addTaskToList(dateKey, tasks)
    }
  }
}

function getColorForPercentage(percentage) {
  if (percentage <= 25) return 'bg-danger' // Kırmızı
  if (percentage <= 50) return 'bg-warning' // Sarı
  if (percentage <= 75) return 'bg-info' // Mavi
  return 'bg-success' // Yeşil
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // const userName = document.getElementById('user-name');
    // const userRole = document.getElementById('user-departman');
    // const navbarImage = document.getElementById('navbar-img');

    
    

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

    //  const [ apartmentDetails, subjectsData] = await Promise.all([
    //      getApartmentDetails(userId, apartmentId),
    //      getSubjects(userId, undefined)
    //  ]);

    const subjectsData = await getSubjects('123')

    const projectDetails = await getProjectDetails(userId, projectId)

    // apartmentDetails verilerini al
    const details = projectDetails.data

    // Proje, blok, kat ve daire adlarını HTML elementlerine yerleştirin
    document.getElementById('project-name').textContent =
      details.projectDetails.projectName
    document.getElementById('project-task-percentage').textContent =
      '%' + details.projectDetails.percentByProjectTasks

    // Tamamlanma yüzdesini ve ilerleme çubuğunu HTML elementlerine yerleştirin
    const completionPercentage = details.projectDetails.completionPercentage

    // completionPercentage değerini kontrol et ve NaN ise 0 olarak ayarla
    const formattedCompletionPercentage = isNaN(completionPercentage)
      ? 0
      : parseFloat(completionPercentage).toFixed(2)

    document.getElementById('completed-progress-title').textContent =
      `${formattedCompletionPercentage}% Tamamlandı`
    document.getElementById('completed-progress').style.width =
      `${formattedCompletionPercentage}%`
    document
      .getElementById('completed-progress')
      .setAttribute('aria-valuenow', formattedCompletionPercentage)

    //-----------------------------------KAT İLERLEME YÜZDELERİ-----------------------

    const listContainer = document.getElementById(
      'blocks-completion-percentages',
    )

    // Mevcut listeyi temizle
    listContainer.innerHTML = ''

    details.blockCompletionData.forEach((block) => {
      // Yüzdeye göre renk sınıfını al
      const colorClass = getColorForPercentage(block.percentageCompletion)

      const formattedCompletionPercentage = isNaN(block.percentageCompletion)
        ? 0
        : parseFloat(block.percentageCompletion).toFixed(2)

      // Liste öğesi oluştur
      const listItem = document.createElement('li')
      listItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="me-2">
                        <span class="avatar avatar-lg me-2">
                            <img src="../../assets/images/building-town-svgrepo-com.svg" alt="img">
                        </span>
                    </div>
                    <div class="flex-fill">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-block fw-semibold">${block.name}</span>
                            <span class="d-block">${formattedCompletionPercentage}%</span>
                        </div>
                        <div class="progress progress-animate progress-xs" role="progressbar" aria-valuenow="${formattedCompletionPercentage}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped ${colorClass}" style="width: ${formattedCompletionPercentage}%"></div>
                        </div>
                    </div>
                </div>
            `

      // Listeye öğeyi ekle
      listContainer.appendChild(listItem)
    })

    //-----------------------------------KAT GÖREVLERİ-----------------------

    const tasks = details.tasks

    const projectTaskListContainer =
      document.getElementById('project-task-list')

    tasks.forEach((task) => {
      // Tarihleri formatlamak için yardımcı fonksiyon
      function formatDate(timestamp) {
        const date = new Date(timestamp)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      }

      // Zorluk seviyesini yıldızlarla göstermek için helper fonksiyon
      function renderStarRating(rating, taskId) {
        const starDiv = document.createElement('div')
        starDiv.id = `stars-${taskId}`
        starDiv.classList.add('star-rating')
        return starDiv
      }

      // İşlemler için dropdown menüsü oluşturma
      function renderActionsDropdown(taskId) {
        const dropdownDiv = document.createElement('div')
        dropdownDiv.classList.add('dropdown')

        const anchor = document.createElement('a')
        anchor.href = 'javascript:void(0);'
        anchor.classList.add('p-2', 'fs-16', 'text-muted')
        anchor.setAttribute('aria-label', 'anchor')
        anchor.setAttribute('data-bs-toggle', 'dropdown')
        anchor.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>'

        const dropdownMenu = document.createElement('ul')
        dropdownMenu.classList.add('dropdown-menu')

        const editItem = document.createElement('li')
        const editLink = document.createElement('a')
        editLink.classList.add('dropdown-item')
        editLink.href = 'javascript:void(0);'
        editLink.setAttribute('data-task-id', taskId)
        editLink.setAttribute('data-action', 'edit')
        editLink.textContent = 'Düzenle'
        editItem.appendChild(editLink)

        const addProgressItem = document.createElement('li')
        const addProgressLink = document.createElement('a')
        addProgressLink.classList.add('dropdown-item')
        addProgressLink.href = 'javascript:void(0);'
        addProgressLink.setAttribute('data-task-id', taskId)
        addProgressLink.setAttribute('data-action', 'add-progress')
        addProgressLink.setAttribute('data-bs-toggle', 'modal')
        addProgressLink.setAttribute('data-bs-target', '#add-task-action-modal')
        addProgressLink.addEventListener('click', () =>
          openAddProgressModal(taskId, tasks),
        )
        addProgressLink.textContent = 'İlerleme Ekle'
        addProgressItem.appendChild(addProgressLink)

        const actionHistoryItem = document.createElement('li')
        const actionHistoryLink = document.createElement('a')
        actionHistoryLink.classList.add('dropdown-item')
        actionHistoryLink.href = 'javascript:void(0);'
        actionHistoryLink.addEventListener('click', () =>
          populateTaskActions(taskId, tasks),
        )
        actionHistoryLink.textContent = 'İlerleme Detay'
        actionHistoryItem.appendChild(actionHistoryLink)

        const deleteItem = document.createElement('li')
        const deleteLink = document.createElement('a')
        deleteLink.classList.add('dropdown-item')
        deleteLink.href = 'javascript:void(0);'
        deleteLink.setAttribute('data-task-id', taskId)
        deleteLink.setAttribute('data-action', 'delete')
        deleteLink.textContent = 'Sil'
        deleteItem.appendChild(deleteLink)

        dropdownMenu.appendChild(editItem)
        dropdownMenu.appendChild(addProgressItem)
        dropdownMenu.appendChild(actionHistoryItem)
        dropdownMenu.appendChild(deleteItem)

        dropdownDiv.appendChild(anchor)
        dropdownDiv.appendChild(dropdownMenu)

        return dropdownDiv
      }

      // Yeni tablo satırı oluşturma
      const row = document.createElement('tr')
      row.classList.add('task-list')

      // Task bilgilerini tablo hücrelerine ekleme
      const subjectNameCell = document.createElement('td')
      const subjectNameSpan = document.createElement('span')
      subjectNameSpan.classList.add('fw-semibold')
      subjectNameSpan.textContent = task.subjectName || 'N/A'
      subjectNameCell.appendChild(subjectNameSpan)
      row.appendChild(subjectNameCell)

      const subSubjectNameCell = document.createElement('td')
      const subSubjectNameSpan = document.createElement('span')
      subSubjectNameSpan.classList.add('fw-semibold')
      subSubjectNameSpan.textContent = task.subSubjectName || 'N/A'
      subSubjectNameCell.appendChild(subSubjectNameSpan)
      row.appendChild(subSubjectNameCell)

      const createdAtCell = document.createElement('td')
      createdAtCell.textContent = formatDate(task.createdAt)
      row.appendChild(createdAtCell)

      const statusCell = document.createElement('td')
      const statusSpan = document.createElement('span')
      statusSpan.classList.add('fw-semibold', 'text-primary')
      statusSpan.textContent =
        task.status.charAt(0).toUpperCase() + task.status.slice(1)
      statusCell.appendChild(statusSpan)
      row.appendChild(statusCell)

      const progressCell = document.createElement('td')
      const progressDiv = document.createElement('div')
      progressDiv.classList.add('progress', 'mb-3')
      progressDiv.setAttribute('role', 'progressbar')
      progressDiv.setAttribute('aria-valuenow', task.percentComplete)
      progressDiv.setAttribute('aria-valuemin', '0')
      progressDiv.setAttribute('aria-valuemax', '100')

      const progressBarDiv = document.createElement('div')
      progressBarDiv.classList.add('progress-bar')
      progressBarDiv.style.width = `${task.percentComplete}%`
      progressBarDiv.textContent = `${task.percentComplete}%`
      progressDiv.appendChild(progressBarDiv)
      progressCell.appendChild(progressDiv)
      row.appendChild(progressCell)

      const starRatingCell = document.createElement('td')
      starRatingCell.appendChild(
        renderStarRating(task.difficultyLevel, task._id),
      )
      row.appendChild(starRatingCell)

      const actionsCell = document.createElement('td')
      actionsCell.appendChild(renderActionsDropdown(task._id))
      row.appendChild(actionsCell)

      projectTaskListContainer.appendChild(row)

      // Yıldız derecelendirmesi
      raterJs({
        max: 5,
        starSize: 24,
        readOnly: true,
        rating: task.difficultyLevel,
        element: document.querySelector(`#stars-${task._id}`),
      })
    })

    document
      .getElementById('add-task-button')
      .addEventListener('click', async function () {
        const taskTypeSelect = document.getElementById('task-type-select')

        var option = document.createElement('option')
        option.text = 'Seçiniz'
        option.value = ''
        option.selected = true
        option.disabled = true
        taskTypeSelect.add(option)

        // Departmanları departmanSelect'e ekle
        subjectsData.data.forEach(function (subject) {
          var option = document.createElement('option')
          option.text = subject.name
          option.value = subject._id
          taskTypeSelect.appendChild(option)
        })

        taskTypeSelect.addEventListener('change', async function () {
          var taskTypeId = this.value

          const taskNameSelect = document.getElementById('task-name-select')

          // subDepartmanSelect'i temizle
          taskNameSelect.innerHTML = ''

          try {
            var selectedTaskType = subjectsData.data.find(function (taskType) {
              return taskType._id === taskTypeId
            })

            var option = document.createElement('option')
            option.text = 'Seçiniz'
            option.value = ''
            option.selected = true
            option.disabled = true
            taskNameSelect.add(option)

            if (selectedTaskType) {
              selectedTaskType.subSubjects.forEach(function (subSubject) {
                var option = document.createElement('option')
                option.text = subSubject.name
                option.value = subSubject._id
                taskNameSelect.add(option)
              })
            }
          } catch (error) {
            console.error('Veri alınamadı:', error)
          }
        })
      })

    document
      .getElementById('accept-add-task-button')
      .addEventListener('click', async function () {
        var starRate = raterJs({
          element: document.querySelector('#rater-steps'),
          rateCallback: function (rating, done) {
            this.setRating(rating)
            done()
          },
          starSize: 24,
          step: 0.5,
        })

        const taskType = document.getElementById('task-type-select').value
        const taskName = document.getElementById('task-name-select').value
        const progress = parseInt(
          document.getElementById('progress-bar').getAttribute('aria-valuenow'),
        )
        const difficulty = starRate.getRating() // veya this.getRating() kullanarak döndürülen değeri alabilirsiniz.

        const formData = {
          task: {
            name: 'name',
            subSubjectId: taskName,
            status: 'pending',
            difficultyLevel: difficulty,
            percentComplete: progress,
          },
          buildingId: projectId,
          buildingType: 'project',
        }

        Swal.fire({
          title: 'İşlemi Onaylıyor musunuz?',
          text: 'Görev eklemek istediğinize emin misiniz?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Evet, Ekle',
          cancelButtonText: 'Vazgeç',
        }).then((result) => {
          if (result.isConfirmed) {
            // İsteği gönder
            axios
              .post(
                'http://localhost:3001/api/v1/crm/admin/assignTasksToBuildingUnits',
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
                  text: 'Görev başarıyla eklendi.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  window.location.href = `project-details.html?id=${floorId}`
                })
              })
              .catch((error) => {
                if (error.response) {
                  const errorMessage = error.response.data.msg
                  const errorDetail = error.response.data.detail
                  Swal.fire({
                    title: 'Hata!',
                    text:
                      error.response.data.msg +
                      '---' +
                      error.response.data.detail,
                    icon: 'error',
                    confirmButtonText: 'Tamam',
                  })
                } else {
                  // Ağ hatası veya başka bir hata
                  console.error('Hata:', error)
                  Swal.fire({
                    title: 'Hata!',
                    text:
                      error.response.data.msg +
                      '---' +
                      error.response.data.detail,
                    icon: 'error',
                    confirmButtonText: 'Tamam',
                  })
                }
              })
          }
        })
      })

    document
      .getElementById('accept-add-action-button')
      .addEventListener('click', async function () {
        // Input değerlerini toplama
        const taskId = document.getElementById('action-task-id').value
        const taskType = document.getElementById('action-type-select').value
        const actionDate = document.getElementById('action-date').value
        const actionProgress = document
          .getElementById('action-progress-bar')
          .getAttribute('aria-valuenow')
        const actionFiles = document.getElementById('action-files').files
        const actionDescription =
          document.getElementById('action-description').value

        // FormData nesnesi oluşturma
        const formData = new FormData()
        formData.append('userId', '123')
        formData.append('taskId', taskId)
        formData.append('type', 'project')
        formData.append('buildingId', projectId)
        formData.append('date', actionDate)
        formData.append('percentComplete', actionProgress)
        formData.append('description', actionDescription)

        for (let i = 0; i < actionFiles.length; i++) {
          formData.append('photos', actionFiles[i])
        }

        // formData içeriğini kontrol için loglama
        for (let [key, value] of formData.entries()) {
          console.log(key, value)
        }

        Swal.fire({
          title: 'İşlemi Onaylıyor musunuz?',
          text: 'İlerleme bilgilerini kaydetmek istediğinize emin misiniz?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Evet, Kaydet',
          cancelButtonText: 'Vazgeç',
        }).then((result) => {
          if (result.isConfirmed) {
            // İsteği gönder
            axios
              .post(
                'http://localhost:3001/api/v1/crm/admin/setActionToTask',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + jwt,
                  },
                },
              )
              .then((response) => {
                // İşlem tamamlandı bildirimi
                Swal.fire({
                  title: 'Tamamlandı!',
                  text: 'İlerleme bilgileri başarıyla kaydedildi.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  //window.location.href = `apartment-details.html?id=${apartmentId}`; // Yönlendir
                })
              })
              .catch((error) => {
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

    function hideLoader() {
      const loader = document.getElementById('loader')
      loader.classList.add('d-none')
    }

    hideLoader()
  } catch (error) {
    console.error('Form verileri kaydedilirken bir hata oluştu:', error)
  }
})

$(document).ready(function () {
  //SADECE NUMARA
  $('#number').inputmask({
    alias: 'decimal',
    radixPoint: ',',
    groupSeparator: '',
    autoGroup: false,
    digits: 2,
    digitsOptional: true,
    allowMinus: false,
    rightAlign: false,
    placeholder: '',
  })

  $('#amercement').inputmask({
    alias: 'decimal',
    radixPoint: ',',
    groupSeparator: '',
    autoGroup: false,
    digits: 2,
    digitsOptional: true,
    allowMinus: false,
    rightAlign: false,
    placeholder: '',
  })

  $('#paid-expense-amount').inputmask({
    alias: 'decimal',
    radixPoint: ',',
    groupSeparator: '',
    autoGroup: false,
    digits: 2,
    digitsOptional: true,
    allowMinus: false,
    rightAlign: false,
    placeholder: '',
  })

  $('#vehicle-year').inputmask({
    mask: '9999',
    placeholder: '',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  //TELEFON
  $('#personal-phone').inputmask('(999) 999-9999')

  $('#company-phone').inputmask('(999) 999-9999')

  $('#update-personal-phone').inputmask('(999) 999-9999')

  $('#update-company-phone').inputmask('(999) 999-9999')

  $('#update-company-phone').inputmask('(999) 999-9999')

  $('#contact-phone').inputmask('(999) 999-9999')

  //EMAİL
  $('#personal-email').inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}]@*{1,20}.*{2,7}[.*{1,20}]',
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase()
      return pastedValue.replace('mailto:', '')
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        cardinality: 1,
        casing: 'lower',
      },
    },
  })

  $('#email-address').inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}]@*{1,20}.*{2,7}[.*{1,20}]',
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase()
      return pastedValue.replace('mailto:', '')
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        cardinality: 1,
        casing: 'lower',
      },
    },
  })

  $('#update-personal-email').inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}]@*{1,20}.*{2,7}[.*{1,20}]',
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase()
      return pastedValue.replace('mailto:', '')
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        cardinality: 1,
        casing: 'lower',
      },
    },
  })

  $('#update-email-address').inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}]@*{1,20}.*{2,7}[.*{1,20}]',
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase()
      return pastedValue.replace('mailto:', '')
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        cardinality: 1,
        casing: 'lower',
      },
    },
  })

  $('#main-email').inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}]@*{1,20}.*{2,7}[.*{1,20}]',
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase()
      return pastedValue.replace('mailto:', '')
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        cardinality: 1,
        casing: 'lower',
      },
    },
  })

  $('#second-email').inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}]@*{1,20}.*{2,7}[.*{1,20}]',
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase()
      return pastedValue.replace('mailto:', '')
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        cardinality: 1,
        casing: 'lower',
      },
    },
  })

  //PLAKA
  $('#vehicle-unique-id').inputmask({
    mask: '99 AA[A] 9999',
    definitions: {
      A: {
        validator: '[A-Za-zÇĞİÖŞÜa-zçğıöşü]',
        casing: 'upper',
      },
    },
    placeholder: ' ',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  //SADECE HARF
  $('#first-name').inputmask({
    mask: '*{1,}', // En az 1 karakter
    definitions: {
      '*': {
        validator: '[A-Za-zÇĞİÖŞÜçğıöşü]', // Türkçe harf karakterlerini kabul eden validator
        casing: 'mixed', // Girişin hem büyük hem de küçük harf olmasını sağlıyoruz
      },
    },
    placeholder: '',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  $('#last-name').inputmask({
    mask: '*{1,}', // En az 1 karakter
    definitions: {
      '*': {
        validator: '[A-Za-zÇĞİÖŞÜçğıöşü]', // Türkçe harf karakterlerini kabul eden validator
        casing: 'mixed', // Girişin hem büyük hem de küçük harf olmasını sağlıyoruz
      },
    },
    placeholder: '',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  $('#update-first-name').inputmask({
    mask: '*{1,}', // En az 1 karakter
    definitions: {
      '*': {
        validator: '[A-Za-zÇĞİÖŞÜçğıöşü]', // Türkçe harf karakterlerini kabul eden validator
        casing: 'mixed', // Girişin hem büyük hem de küçük harf olmasını sağlıyoruz
      },
    },
    placeholder: '',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  $('#update-last-name').inputmask({
    mask: '*{1,}', // En az 1 karakter
    definitions: {
      '*': {
        validator: '[A-Za-zÇĞİÖŞÜçğıöşü]', // Türkçe harf karakterlerini kabul eden validator
        casing: 'mixed', // Girişin hem büyük hem de küçük harf olmasını sağlıyoruz
      },
    },
    placeholder: '',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  $('#vehicle-color').inputmask({
    mask: '*{1,}', // En az 1 karakter
    definitions: {
      '*': {
        validator: '[A-Za-zÇĞİÖŞÜçğıöşü]', // Türkçe harf karakterlerini kabul eden validator
        casing: 'mixed', // Girişin hem büyük hem de küçük harf olmasını sağlıyoruz
      },
    },
    placeholder: '',
    greedy: false,
    autoUnmask: true,
    clearMaskOnLostFocus: true,
  })

  //ARAÇ KM
  $('#vehicle-km').inputmask({
    alias: 'numeric',
    groupSeparator: '',
    autoGroup: true,
    digits: 0,
    digitsOptional: false,
    max: 10000000,
    rightAlign: false,
    placeholder: '0',
    numericInput: true,
  })
})

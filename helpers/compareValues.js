const _ = require('lodash')
const compareValues = async (oldValue, updateValue) => {
  let diff = {}

  for (const key in updateValue) {
    if (
      !Array.isArray(updateValue[key]) &&
      !_.isEqual(updateValue[key], oldValue[key])
    ) {
      diff[key] = {
        oldValue: oldValue[key],
      }
    }
  }

  const { _doc, ...response } = diff
  return response
}

function filterUnwantedArrayFields(data, unwantedFields) {
  return data.map((item) => {
    const filteredItem = {}

    Object.keys(item).forEach((key) => {
      if (!unwantedFields.includes(key)) {
        if (Array.isArray(item[key])) {
          filteredItem[key] = item[key].map((subItem) => {
            const filteredSubItem = {}
            Object.keys(subItem).forEach((subKey) => {
              if (!unwantedFields.includes(subKey)) {
                filteredSubItem[subKey] = subItem[subKey]
              }
            })
            return filteredSubItem
          })
        } else {
          filteredItem[key] = item[key]
        }
      }
    })

    return filteredItem
  })
}

module.exports = {
  compareValues,
  filterUnwantedArrayFields,
}

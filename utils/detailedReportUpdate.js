const { Category } = require('../models')
const createUrl = require('./createUrl')

const detailedInfoUpdate = async (dataObj, req) => {
  const data = JSON.parse(JSON.stringify(dataObj))

  try {
    const categories = await Category
      .find()
      .select({ createdAt: 0, updatedAt: 0 })

    if (categories.length !== 0) {
      categories.forEach(elem => {
        elem.iconUrl = createUrl({ req, urlCombinedPath: elem.iconUrl })
      })

      data.ids.forEach(id => {
        const category = categories.find(category => category._id.toString() === id)
        data.entities[id].iconUrl = category ? category.iconUrl : null
        data.entities[id].name = category ? category.name : null
      })
    }

    return data
  } catch (error) {
    return dataObj
  }
}

module.exports = detailedInfoUpdate

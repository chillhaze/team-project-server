const { Category } = require('../../models')

const { createUrl } = require('../../utils')

const getCategories = async (req, res) => {
  const result = await Category
    .find()
    .select({ createdAt: 0, updatedAt: 0 })

  if (result.length !== 0) {
    result.forEach(elem => {
      elem.iconUrl = createUrl({ req, urlCombinedPath: elem.iconUrl })
    })
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getCategories

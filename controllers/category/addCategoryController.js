const { Category } = require('../../models')

const addCategory = async (req, res) => {
  console.log(req.body)
  const result = await Category.create(req.body)

  const { _id, type, name, iconUrl } = result

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: { _id, type, name, iconUrl }
    }
  })
}

module.exports = addCategory

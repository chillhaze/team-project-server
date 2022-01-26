const { Schema, model } = require('mongoose')
const path = require('path')

const categorySchema = Schema({
  type: {
    type: String,
    required: [true, 'Unknown category type'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Unset category name']
  },
  iconUrl: {
    type: String,
    default: ''
  }
}, { versionKey: false, timestamps: true })

categorySchema.post('save', doc => {
  doc.iconUrl = path.join('icons', `${doc.id}.svg`)
  doc.save()
})

const Category = model('category', categorySchema)

module.exports = { Category }

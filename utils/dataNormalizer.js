const dataNormalizer = (arrayOfObjects, keyName) => {
  const isExistingKey = arrayOfObjects.every(elem => {
    for (const key in elem) {
      if (key === keyName) {
        return true
      }
    }
    return false
  })

  // returning original array if the normalizing by specified
  // key is imposible
  if (!isExistingKey) return arrayOfObjects

  return {
    ids: arrayOfObjects.map(elem => elem[keyName]),
    entities: arrayOfObjects.reduce((acc, elem) => {
      return { ...acc, [elem[keyName]]: elem }
    }
    , {})
  }
}

module.exports = dataNormalizer

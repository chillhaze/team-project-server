const { nanoid } = require('nanoid')

const groupByUniqueDescriptions = arrayOfObjects => {
  return arrayOfObjects.reduce((acc, elem) => {
    const indexOfExistingElem = acc.findIndex(({ description }) => description === elem.description)

    if (indexOfExistingElem === -1) {
      acc.push({ id: nanoid(11), ...elem })
    } else {
      acc[indexOfExistingElem].total += elem.total
    }

    return acc
  }, [])
}

module.exports = groupByUniqueDescriptions

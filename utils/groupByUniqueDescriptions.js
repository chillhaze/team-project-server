const { nanoid } = require('nanoid')

const groupByUniqueDescriptions = arrayOfObjects => {
  return arrayOfObjects.reduce((acc, elem) => {
    const indexOfExistingElem = acc.findIndex(({ name }) => name === elem.name)

    if (indexOfExistingElem === -1) {
      acc.push({ id: nanoid(11), ...elem })
    } else {
      acc[indexOfExistingElem].total += elem.total
    }

    return acc
  }, [])
}

module.exports = groupByUniqueDescriptions

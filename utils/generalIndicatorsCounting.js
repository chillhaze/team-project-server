const CATEGORY_TYPES = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

const generalIndicatorsCounting = report => {
  return report.reduce((acc, elem) => {
    const tmp = [...acc]

    elem.type === CATEGORY_TYPES.DEBIT
      ? tmp[0] += elem.total
      : tmp[1] += elem.total

    return tmp
  }, [0, 0])
}

module.exports = generalIndicatorsCounting

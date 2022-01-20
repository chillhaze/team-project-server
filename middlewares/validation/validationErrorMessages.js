const ERROR_MESSAGES = {
  missingTypeField: 'missing required type field',
  invalidTypeValue: 'invalid type value',
  missingDescriptionField: 'missing required description field',
  invalidDescriptionValue: 'invalid description value (must be between 2 and 20 characters, starting with letters and consisting of letters, numbers and spaces )',
  missingDateField: 'missing required date field',
  invalidDateFormat: 'invalid date format (must be in ISO 8601 format)',
  missingCategoryField: 'missing required category field',
  invalidCategoryFormat: 'invalid category format',
  missingAmountField: 'missing required amount field',
  invalidAmountFormat: 'invalid amount format',
  missingOwnerField: 'missing required owner field',
  invalidOwnerFormat: 'invalid owner format',
  missingIdQueryString: 'missing required query string of transactionId',
  invalidIdQueryStringFormat: 'invalid transactionId query string format',
  missingTypeQueryString: 'missing required query string of type',
  invalidTypeQueryStringFormat: 'invalid transactionId query string format',
  missingPeriodQueryString: 'missing required query string of period',
  invalidPeriodQueryStringFormat: 'invalid period query string format',
  outOfRangePeriodQueryString: 'period query string data is out of range (1900-9999)',
  missingYearQueryString: 'missing required query string of year',
  invalidYearQueryStringFormat: 'invalid year query string format',
  outOfRangeYearQueryString: 'year query string data is out of range (1900-9999)',
  invalidMonthQueryStringFormat: 'invalid month query string format',
  missingMonthQueryString: 'missing required query string of month',
  outOfRangeMonthQueryString: 'month query string data is out of range (0-11)',
  missingNameField: 'missing required name field',
  invalidNameValue: 'invalid name value (must be between 2 and 20 characters, starting with letters and consisting of letters, commas and spaces )'
}

module.exports = ERROR_MESSAGES

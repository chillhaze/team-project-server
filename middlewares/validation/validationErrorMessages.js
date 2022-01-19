const ERROR_MESSAGES = {
  missingTypeField: 'missing required transaction type field',
  invalidTypeValue: 'invalid transaction type value',
  missingDescriptionField: 'missing required transaction description field',
  invalidDescriptionValue: 'invalid transaction description value (must be between 2 and 20 characters, starting with letters and consisting of letters, numbers and spaces )',
  missingDateField: 'missing required transaction date field',
  invalidDateFormat: 'invalid transaction date format (must be in ISO 8601 format)',
  missingCategoryField: 'missing required transaction category field',
  invalidCategoryFormat: 'invalid transaction category format',
  missingAmountField: 'missing required transaction amount field',
  invalidAmountFormat: 'invalid transaction amount format',
  missingOwnerField: 'missing required transaction owner field',
  invalidOwnerFormat: 'invalid transaction owner format',
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
  outOfRangeMonthQueryString: 'month query string data is out of range (0-11)'
}

module.exports = ERROR_MESSAGES

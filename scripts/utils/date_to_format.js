/**
 * JSDoc style named function type
 * @callback dateToFormat
 * @param {string} date
 * @returns {string}
 */

/**
 * @type dateToFormat
 */



const dateToFormat = (date) => {
  let [day, month, year] = date.split('/')
    day = day.padStart(2, '0')
    month = month.padStart(2, '0')
    return [day, month, year].join('.')
};

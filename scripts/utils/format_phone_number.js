

/**
 * 
 * @param {string} phoneNumber 
 */
const formatPhoneNumber = (phoneNumber) => {
    try{
        const numberWithoutDelimetrs = phoneNumber.replace(/[^+0-9]/, '')
        const matches = numberWithoutDelimetrs.match(/(\+?\d)(\d{3})(\d{3})(\d{2})(\d{2})/)
        return `${matches[1]} (${matches[2]}) ${matches[3]}-${matches[4]}-${matches[5]}`
    } catch {
        return phoneNumber
    }

}
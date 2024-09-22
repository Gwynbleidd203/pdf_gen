const CONFIG = require("../../config")

/**
 * @param {string[][]} rawCSV
 */
function cleanData(rawCSV) {

    const header = rawCSV[0]
    const body = rawCSV.slice(1)

    console.log("Header", header)
    console.log("Body", body)
}

module.exports = cleanData
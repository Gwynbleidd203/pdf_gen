const { parse } = require('csv-parse');
const fs = require('fs');
const uuid = require('crypto')
const CONFIG = require('../../config');

/**
 * Reads a CSV file and returns a Promise that resolves with an array of rows
 * @returns {Promise<string[][]>}
 */
function readCSV() {
    const path = "data/test.csv";

    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream(path)
            .pipe(parse({
                delimiter: ',',
                from_line: 2, // Adjust if you need to include headers
                trim: true
            }))
            .on('data', (row) => {

                if (row[CONFIG.columnMap.status] === "Concluída") {

                    data.push(row);
                }

            })
            .on('end', () => {
                console.log('File read successful');
                resolve(data);
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error.message);
                reject(error);
            });
    });
}


/**
 * Processes a list of string arrays and converts them into an array of objects
 * @typedef {Object} StudentRequest
 * @property {string} name - Student´s full name
 * @property {string} req - Student´s request
 * @property {string} course - Student´s current course
 * @property {Date} date - Request date
 * @param {string[][]} stringList
 * @returns {StudentRequest[]}
 */
function objectifyCSV(stringList) {
    return stringList.map(row => ({
        id: `${row[CONFIG.columnMap.dateAndHour].replace(/ /g, "_")}${row[CONFIG.columnMap.cpf]}`,
        name: row[CONFIG.columnMap.fullName],
        req: row[CONFIG.columnMap.requisition],
        course: row[CONFIG.columnMap.superiorCourse.lenght === 0 ? CONFIG.columnMap.technicalCourse : CONFIG.columnMap.superiorCourse],
        date: row[CONFIG.columnMap.dateAndHour].split(" ")[0] // Convert date string to Date object
    }));
}

/**
 * Fetches and processes CSV data
 * @returns {Promise<StudentRequest[]>}
 */
function getCSVData() {
    return readCSV().then(objectifyCSV).catch(error => {
        console.error('Failed to process CSV:', error);
        throw error;
    });
}

module.exports = getCSVData;
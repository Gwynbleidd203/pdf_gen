import { parse } from "csv-parse";
import fs from "fs";
import { CONFIG } from "../config";
import { StudentRequest } from "../types/StudentRequest";

function readCSV(): Promise<string[][]> {
    const path = "data/test.csv";

    return new Promise((resolve, reject) => {
        const data: string[][] = [];

        fs.createReadStream(path)
            .pipe(parse({
                delimiter: ',',
                from_line: 2,
                trim: true,
                relax_quotes: true // Add this if you want to handle quotes in your CSV
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

function objectifyCSV(stringList: string[][]): StudentRequest[] {
    return stringList.map(row => ({
        id: `${row[CONFIG.columnMap.dateAndHour].replace(/ /g, "_")}${row[CONFIG.columnMap.cpf]}`,
        name: row[CONFIG.columnMap.fullName],
        req: row[CONFIG.columnMap.requisition],
        course: row[CONFIG.columnMap.superiorCourse ? CONFIG.columnMap.technicalCourse : CONFIG.columnMap.superiorCourse],
        date: row[CONFIG.columnMap.dateAndHour].split(" ")[0]
    }));
}

function getCSVData(): Promise<StudentRequest[]> {
    return readCSV()
        .then(objectifyCSV)
        .catch(error => {
            console.error('Failed to process CSV:', error);
            throw error;
        });
}

export { getCSVData };

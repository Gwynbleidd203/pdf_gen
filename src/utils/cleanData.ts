import { StudentRequest } from "../types/StudentRequest"

function cleanData(rawCSV: StudentRequest[]) {

    const header = rawCSV[0]
    const body = rawCSV.slice(1)

    console.log("Header", header)
    console.log("Body", body)
}

export { cleanData }
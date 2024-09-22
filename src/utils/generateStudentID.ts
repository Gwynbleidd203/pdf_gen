import { createHmac} from "node:crypto";
import { CONFIG } from "../config";

function generateStudentID(reqDate: string) {

    const secret = reqDate

    const hash = createHmac('sha256', secret)
        .update(CONFIG.secretKey)
        .digest('hex')


    console.log(hash)
}

generateStudentID("19/10/2024")
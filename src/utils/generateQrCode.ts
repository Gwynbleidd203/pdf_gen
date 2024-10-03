import QRCode from "qrcode";

import { StudentEncryption } from "../types/StudentEncrypton";

import { generateStudentEncryption, generateStudentID } from "./handleStudentID";

async function generateQRCode(data: StudentEncryption) {

    try {

        const stringfiedText = JSON.stringify(data);

        const url = QRCode.toDataURL(stringfiedText);

        return url;

    } catch(err) {

        console.error(err);
    }
}

const { encrypted, iv, authTag, key } = generateStudentEncryption(generateStudentID("19/10/2024 22:22:59", "12345678912"));
console.log("Encrypted:", encrypted);
console.log("IV (nonce):", iv);
console.log("Authentication Tag:", authTag);
console.log("Key (nonce):", key);

console.log(generateQRCode({encrypted, iv, authTag, key}))
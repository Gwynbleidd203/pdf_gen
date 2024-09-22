import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

function generateStudentID(reqData:string, cpf: string) {

    return reqData.replace(/ /g, "") + cpf.slice(5)
}

function generateStudentEncryption(secret: string) {
    const key = randomBytes(32);  
    const iv = randomBytes(12);

    const cipher = createCipheriv("chacha20-poly1305", key, iv, { authTagLength: 16 });

    let encrypted = cipher.update(secret, "utf-8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");  

    return { encrypted, iv: iv.toString("hex"), authTag, key };  // Return the key for decryption
}

function decryptStudentID(encrypted: string, iv: string, authTag: string, key: Buffer) {
    const decipher = createDecipheriv("chacha20-poly1305", key, Buffer.from(iv, "hex"), { authTagLength: 16 });

    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
}

// Example usage:
const { encrypted, iv, authTag, key } = generateStudentEncryption(generateStudentID("19/10/2024 22:22:59", "12345678912"));
console.log("Encrypted:", encrypted);
console.log("IV (nonce):", iv);
console.log("Authentication Tag:", authTag);
console.log("Key (nonce):", key);

// Decrypting the data
const decrypted = decryptStudentID(encrypted, iv, authTag, key);
console.log("Decrypted:", decrypted);

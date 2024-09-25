export type StudentEncryption = {

    encrypted: string;
    iv: string;
    authTag: string;
    key: Buffer
}
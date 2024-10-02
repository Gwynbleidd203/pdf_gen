import fs from "fs"
import path from "path"
import PDFDocument from "pdfkit"

import { StudentRequest } from "./types/StudentRequest";

import { CONFIG } from "./config"; // Ensure CONFIG.img contains the path to your image

import { cleanData } from "./utils/cleanData";
import { getCSVData } from "./utils/handleCSV";

getCSVData()
    .then(data => {
        cleanData(data)
        pipelineGeneration(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });


function generateDocument(outputPath: string, data: StudentRequest) {
    const doc = new PDFDocument();

    // Ensure the dist directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the document to a file
    doc.pipe(fs.createWriteStream(outputPath));

    // Center the image on the new page
    const pageWidth = doc.page.width;
    const x = (pageWidth - CONFIG.imageWidth) / 2; // Calculate the x position to center the image
    const y = 20; // Set y position

    // Display image
    doc.image(CONFIG.img, x, y, { width: CONFIG.imageWidth });
    doc.moveDown(3); // Adds some space after the image

    // Add text content
    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Ministério da Educação", { align: "center" })
        .text("Secretaria de Educação Profissional e Tecnológica - SETEC", { align: "center" })
        .text("Instituto Federal de Educação, Ciência e Tecnologia do Sul de Minas Gerais", { align: "center" })
        .text("Campus Muzambinho", { align: "center" })
        .moveDown(6)
        .fontSize(16)
        .text("Requerimento de Documentos da Coordenadoria de Registros Acadêmicos", {
            align: 'center',
            continued: false // Ensure the text is centered and on a new line
        })
        .font("Helvetica")
        .moveDown(4)
        .fontSize(14)
        .text(`O aluno(a) ${data.name}, solicitou a(o) ${data.req}, referente ao curso ${data.course} do IFSULDEMINAS - Campus Muzambinho na data de ${data.date}.`, { align: 'justify' })
        .moveDown(4)
        .text(`Muzambinho - MG, ${new Date().toLocaleDateString('pt-BR', CONFIG.dateOptions)}.`, { align: "right" })
        // End the document
        .end();
}


function pipelineGeneration(objectList: StudentRequest[]) {
    objectList.forEach(item => {
        // Format date for filename
        //const formattedDate = new Date(item.date).toISOString().split('T')[0]; // Example format: yyyy-mm-dd
        let outputName = `${item.name.toLowerCase().replace(/ /g, "_")}_${item.req.toLowerCase().replace(/ /g, "_")}_${new Date().toLocaleDateString('pt-BR', CONFIG.dateOptions).replace(/ /g, "_")}.pdf`;

        if (outputName.length > 128) {

            outputName = `${item.name.toLowerCase().replace(/ /g, "_")}_${new Date().toLocaleDateString('pt-BR', CONFIG.dateOptions).replace(/ /g, "_")}.pdf`
        }

        // Ensure to provide the full path for the output file
        const outputPath = path.join(CONFIG.outputDir, outputName);

        generateDocument(outputPath, item);
    });
}

/*
fs = require('fs'),
        PDFParser = require("pdf2json/pdfparser");

    pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./test.js", JSON.stringify(pdfData));
    });

    pdfParser.loadPDF("./test.pdf");*/
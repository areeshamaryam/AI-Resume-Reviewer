import PDFParser from "pdf2json";

const parsePDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        let text = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textItem) => {
            if (textItem.R) {
              textItem.R.forEach((item) => {
                try {
                  text += decodeURIComponent(item.T) + " ";
                } catch (e) {
                  // If decoding fails, use the raw text instead
                  text += item.T + " ";
                }
              });
            }
          });

          text += "\n";
        });

        resolve(text);
      } catch (error) {
        reject(error);
      }
    });

    pdfParser.loadPDF(filePath);
  });
};

export default parsePDF;

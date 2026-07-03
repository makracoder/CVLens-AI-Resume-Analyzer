const fs = require('fs');
const path = require('path');
const pdfParse = require('@cyber2024/pdf-parse-fixed');
const mammoth = require('mammoth');

const extractText = async (filePath, mimeType) => {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error('File not found at path: ' + absolutePath);
  }

  if (mimeType === 'application/pdf') {
    const dataBuffer = fs.readFileSync(absolutePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (
    mimeType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ path: absolutePath });
    return result.value;
  }

  throw new Error('Unsupported file type: ' + mimeType);
};

module.exports = { extractText };
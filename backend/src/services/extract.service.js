const pdfParse = require('@cyber2024/pdf-parse-fixed');
const mammoth = require('mammoth');

const extractText = async (buffer, mimeType) => {
  if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimeType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error('Unsupported file type: ' + mimeType);
};

module.exports = { extractText };
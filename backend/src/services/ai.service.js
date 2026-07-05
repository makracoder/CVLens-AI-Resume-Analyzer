const model = require('../config/gemini');

const cleanAndParseJSON = (text) => {
  // Gemini sometimes wraps response in ```json ... ``` even when told not to
  // This strips that out before parsing
  const cleaned = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse Gemini response:', cleaned);
    throw new Error('Gemini returned invalid JSON');
  }
};


const analyzeResume = async (resumeText, jobDescription = null) => {
  const jdSection = jobDescription
    ? `Job Description to match against:\n${jobDescription}`
    : 'No job description provided. Do a general resume analysis.';

  const prompt = `
You are an expert ATS (Applicant Tracking System) and resume analyzer.

Analyze the following resume and return a JSON response ONLY.
Do not include any markdown, backticks, or explanation outside the JSON.

Resume:
${resumeText}

${jdSection}

Return this exact JSON structure:
{
  "atsScore": <number 0-100>,
  "overallFeedback": "<2-3 sentence summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "missingKeywords": ["<keyword 1>", "<keyword 2>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "matchPercentage": <number 0-100 or null if no JD provided>,
  "experienceLevel": "<fresher|junior|mid|senior>"
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return cleanAndParseJSON(text);
};
const generateInterviewQuestions = async (resumeText, jobDescription = null, difficulty = 'mixed') => {
  const jdSection = jobDescription
    ? `Job Description:\n${jobDescription}`
    : 'No job description provided. Generate questions based on the resume only.';

  const prompt = `
You are an expert technical interviewer.

Based on the resume and job description below, generate 10 interview questions.
Return a JSON response ONLY. No markdown, no backticks, no explanation outside the JSON.

Resume:
${resumeText}

${jdSection}

Difficulty level requested: ${difficulty} (easy/medium/hard/mixed)

Return this exact JSON structure:
{
  "questions": [
    {
      "question": "<the interview question>",
      "difficulty": "<easy|medium|hard>",
      "category": "<technical|behavioral|project-based|situational>",
      "modelAnswer": "<a concise model answer outline, 3-5 sentences>"
    }
  ]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return cleanAndParseJSON(text);
};

module.exports = { analyzeResume, generateInterviewQuestions };


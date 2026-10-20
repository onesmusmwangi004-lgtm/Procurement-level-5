import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// API Health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiAvailable: !!ai,
    timestamp: new Date().toISOString(),
  });
});

// Deep dive explainer endpoint
app.post('/api/gemini/explain', async (req: Request, res: Response) => {
  try {
    const { topic, unitTitle, specificQuery } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!ai) {
      return res.json({
        content: `### ${topic} - In-Depth Study Analysis\n\n**Unit Context**: ${unitTitle || 'Supply Chain Management Level 5'}\n\n1. **Core Concept Overview**:\n${topic} is a foundational competency tested heavily in KNEC Level 5 examinations. Under TVET CDACC and KNEC curricula, learners must demonstrate both theoretical mastery and practical operational competence.\n\n2. **Kenyan Legal & Regulatory Context (PPADA 2015)**:\nIn Kenya, procurement procedures align strictly with the Public Procurement and Asset Disposal Act (PPADA 2015) and Regulations 2020. Public entities are overseen by the Public Procurement Regulatory Authority (PPRA).\n\n3. **Practical Application & Procedures**:\n- Clear documentation (Requisition, LPO, GRN, Delivery Note, SIV).\n- Strict separation of duties between receiving, storing, and issuing.\n- Compliance with statutory standards (KEBS) and safety policies (OSHA 2007).\n\n4. **KNEC Exam Tip**:\nIn Section B essay questions, always define key terms first, provide at least 5 structured points with real-world examples, and cite relevant Kenyan documents or legal sections where applicable.`,
        isAiGenerated: false,
      });
    }

    const prompt = `You are a Senior KNEC (Kenya National Examinations Council) & TVET CDACC Chief Examiner and Lecturer in Supply Chain Management Level 5.
A student needs an accredited, detailed, high-yield study deep dive on the following:
Unit: "${unitTitle || 'Supply Chain Management Level 5'}"
Topic: "${topic}"
Query/Focus: "${specificQuery || 'Provide an accredited deep-dive explanation with Kenyan context (PPADA 2015, PPRA, KISM, KEBS), operational procedures, key formulas/diagrammatic explanation if applicable, and KNEC examination passing tips.'}"

Format your response in clean Markdown with:
1. Executive Summary & Key Definitions (Strict accredited terminology)
2. Detailed Theoretical & Operational Breakdown (Step-by-step procedures, methods, functions)
3. Kenyan Statutory & Regulatory Alignment (e.g., PPADA 2015 & Regs 2020, PPRA, KISM ethics, AGPO provisions if relevant)
4. Comparative Analysis / Table / Practical Kenyan Industry Example (e.g. Kenya Ports Authority, KEMSA, retail, or manufacturing)
5. Typical KNEC Examination Pitfalls & Model Answer Structure (How examiners award marks).

Keep it authoritative, crystal clear, professional, and directly useful for scoring distinction in KNEC Level 5.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text || 'No explanation generated.';
    return res.json({ content: text, isAiGenerated: true });
  } catch (error: any) {
    console.error('Error generating explanation:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate explanation',
      fallback: 'An error occurred while generating AI notes. Please review the built-in accredited notes.',
    });
  }
});

// Dynamic KNEC question generator
app.post('/api/gemini/generate-questions', async (req: Request, res: Response) => {
  try {
    const { unitTitle, topic, questionType, count = 3, difficulty } = req.body;

    if (!ai) {
      return res.json({
        questions: [
          {
            id: 'mock-gen-1',
            type: questionType || 'Section A',
            difficulty: difficulty || (questionType === 'Section B' ? 'Advanced' : 'Intermediate'),
            question: `Explain four reasons why a purchasing officer must adhere to the 'Five Rights of Purchasing' when procuring raw materials for an enterprise. [8 marks]`,
            marks: 8,
            unit: unitTitle || 'Procurement Management',
            markingScheme: [
              'Right Quality (2 marks): Prevents operational downtime and scrap/rejects.',
              'Right Quantity (2 marks): Avoids overstocking holding costs or stockouts.',
              'Right Price (2 marks): Maximizes cost-efficiency and profitability without sacrificing quality.',
              'Right Time (2 marks): Ensures materials arrive right on schedule for production lines.',
            ],
            examinerTip: 'Ensure you explain each right with its operational impact, not just listing them.',
          },
        ],
        isAiGenerated: false,
      });
    }

    const prompt = `You are a Senior KNEC Examiner for Supply Chain Management Level 5 (Craft Certificate / Diploma).
Generate ${count} authentic KNEC examination questions for:
Unit: "${unitTitle || 'Procurement & Supply Chain Management'}"
Topic: "${topic || 'General Core Syllabus'}"
Question Type: "${questionType || 'Section A and Section B'}"
Target Difficulty: "${difficulty || 'Any appropriate level (Beginner, Intermediate, or Advanced)'}"

Return ONLY valid JSON matching this structure:
{
  "questions": [
    {
      "id": "q1",
      "type": "Section A" or "Section B",
      "difficulty": "Beginner" or "Intermediate" or "Advanced",
      "question": "Clear question text including allocated marks e.g. [4 marks] or [15 marks]",
      "marks": number,
      "unit": "${unitTitle || 'Supply Chain Management'}",
      "markingScheme": [
        "Point 1 with allocated mark",
        "Point 2 with allocated mark"
      ],
      "examinerTip": "Crucial advice on what KNEC markers reward or penalize for this question"
    }
  ]
}
Do not wrap in markdown quotes or extra words, just output the raw JSON object.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '{}';
    const parsed = JSON.parse(jsonText);
    return res.json({ ...parsed, isAiGenerated: true });
  } catch (error: any) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate questions' });
  }
});

// KNEC Answer Grader endpoint
app.post('/api/gemini/grade-answer', async (req: Request, res: Response) => {
  try {
    const { question, maxMarks, studentAnswer, markingScheme } = req.body;

    if (!studentAnswer || !question) {
      return res.status(400).json({ error: 'Question and student answer required.' });
    }

    if (!ai) {
      return res.json({
        awardedMarks: Math.min(Math.round(maxMarks * 0.75), maxMarks),
        maxMarks: maxMarks || 10,
        feedback:
          'Good effort! Your response captures core principles. To score full marks in KNEC Level 5, remember to elaborate each distinct point with operational examples and cite relevant Kenyan legislation like PPADA 2015 where applicable.',
        strengths: ['Clear terminology', 'Structured response'],
        improvements: ['Deepen practical examples', 'Link concepts to warehouse/procurement workflow'],
        isAiGenerated: false,
      });
    }

    const prompt = `You are a strict yet encouraging KNEC (Kenya National Examinations Council) Level 5 Supply Chain Management examiner.
Grade the student's examination answer against the question and marking guide.

Question: "${question}"
Maximum Marks: ${maxMarks || 10}
Marking Guide: ${JSON.stringify(markingScheme || [])}
Student's Answer: "${studentAnswer}"

Evaluate strictly according to KNEC marking criteria:
- Accuracy of definitions and concepts
- Logical structuring and depth of points
- Practical supply chain operational awareness
- Kenyan context (PPADA 2015, KISM, KEBS) where relevant

Return ONLY valid JSON matching this schema:
{
  "awardedMarks": number (between 0 and ${maxMarks || 10}),
  "maxMarks": ${maxMarks || 10},
  "feedback": "Comprehensive, constructive feedback paragraph written in examiner tone",
  "strengths": ["string", "string"],
  "improvements": ["string", "string"],
  "modelAnswerKeyPoints": ["Key point 1 that should have been included", "Key point 2"]
}
No markdown wrapping, return valid JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isAiGenerated: true });
  } catch (error: any) {
    console.error('Error grading answer:', error);
    return res.status(500).json({ error: error.message || 'Failed to grade answer' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Supply Chain Hub Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
});

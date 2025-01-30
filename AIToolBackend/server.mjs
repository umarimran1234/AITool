import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const previousResponses = [];

const generateQuestion = async (topic, difficulty) => {
  console.log(difficulty, "diffculty");
  try {
    const prompt = `Generate ${difficulty} level coding questions on the topic of ${topic}. Provide multiple questions (at least 4), each with a clear problem statement, constraints, expected input, and expected output. 
Format the response as follows:

1. **Question Title**
   - **Problem Statement:** 
   - **Constraints:** 
   - **Expected Input:** 
   - **Expected Output:** 

2. **Question Title**
   - **Problem Statement:** 
   - **Constraints:** 
   - **Expected Input:** 
   - **Expected Output:** 

(Continue in the same format for at least 4 questions.)`;

    const result = await model.generateContent(prompt);
    const responseReturn = result.response.text();

    const questionsArray = responseReturn.split("\n\n\n").map((question) => {
      const parts = question.split("\n");

      const title = parts[0].replace(/^\d+\.\s\*\*(.*?)\*\*$/, "$1").trim();
      const problemStatement = parts[1]
        .replace(/- \*\*Problem Statement:\*\*\s*/, "")
        .trim();
      const constraints = parts[2]
        .replace(/- \*\*Constraints:\*\*\s*/, "")
        .trim();
      const expectedInput = parts[3]
        .replace(/- \*\*Expected Input:\*\*\s*/, "")
        .trim();
      const expectedOutput = parts[4]
        .replace(/- \*\*Expected Output:\*\*\s*/, "")
        .trim();

      return {
        title,
        problemStatement,
        constraints,
        expectedInput,
        expectedOutput,
      };
    });

    previousResponses.push(...questionsArray);

    return questionsArray;
  } catch (error) {
    console.error("Error generating question:", error);
    return "Failed to generate question.";
  }
};

app.get("/api/previous-questions", (req, res) => {
  res.json({ previousQuestions: previousResponses });
});

app.post("/api/generate-question", async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    if (!topic || !difficulty) {
      return res
        .status(400)
        .json({ error: "Topic and difficulty are required!" });
    }

    const result = await generateQuestion(topic, difficulty);

    res.json({ question: result });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

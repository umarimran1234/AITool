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
    origin: `${process.env.ORIGIN_ACCEPT}`,
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is missing. Please set the API key in the environment variables."
  );
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const previousResponses = [];

const generateQuestion = async (topic, difficulty) => {
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

(Continue in the same format  but we do not need unwantedIntroText)`;

    const result = await model.generateContent(prompt);
    const responseReturn = result.response.text();
    const unwantedIntroText =
      /These questions require.*|Remember that the input.*|your code should handle.*/gi;
    const introductoryText = responseReturn.match(unwantedIntroText);
    const cleanResponse = responseReturn.replace(unwantedIntroText, "").trim();

    const questionsArray = cleanResponse.split("\n\n\n").map((question) => {
      const parts = question.split("\n");

      const title = parts[0] ? parts[0].replace(/[^\w\s]/g, "").trim() : "";
      const problemStatement = parts[1]
        ? parts[1].replace(/[^\w\s]/g, "").trim()
        : "";
      const constraints = parts[2]
        ? parts[2].replace(/[^\w\s]/g, "").trim()
        : "";
      const expectedInput = parts[3]
        ? parts[3].replace(/[^\w\s]/g, "").trim()
        : "";
      const expectedOutput = parts[4]
        ? parts[4].replace(/[^\w\s]/g, "").trim()
        : "";
      return {
        title,
        problemStatement,
        constraints,

        expectedInput,
        expectedOutput,
      };
    });

    previousResponses.push(...questionsArray);

    return {
      question: questionsArray,
      introductoryText: introductoryText ? introductoryText.join(" ") : "",
    };
  } catch (error) {
    console.error("Error generating question:", error);
    throw new Error("Failed to generate question.");
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
    const isMeaningfulTopic =
      /^[A-Za-z\s]+$/.test(topic.trim()) && topic.length > 2; // Check for alphabets and length > 2

    if (!isMeaningfulTopic) {
      return res
        .status(400)
        .json({ error: "Invalid Topic: Please provide a valid topic." });
    }
    const result = await generateQuestion(topic, difficulty);

    res.json({
      question: result.question,
      introductoryText: result.introductoryText,
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

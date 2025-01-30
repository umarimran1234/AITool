import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("⚠️ Please enter a topic!");

    setLoading(true);
    setResponse(null); // Clear previous response

    try {
      const res = await fetch("http://localhost:5000/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      const data = await res.json();
      setResponse(data || { question: "No response from AI." });
    } catch (error) {
      console.error("Error:", error);
      setResponse({ question: "❌ Failed to generate question." });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white px-4">
        {/* Main Container */}
        <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Heading */}
          <h1 className="text-5xl font-bold text-center text-gray-200 mb-6 tracking-wide">
            AI Question Generator 🤖
          </h1>

          {/* Input Section */}
          <div className="space-y-5">
            {/* Topic Input */}
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-1">
                Topic:
              </label>
              <input
                type="text"
                placeholder="Enter a topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Difficulty Dropdown */}
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-1">
                Difficulty:
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="Easy">🟢 Easy</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Hard">🔴 Hard</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-3 rounded-md text-lg font-semibold tracking-wide transition-all ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {loading ? "⏳ Generating..." : "Generate Question"}
            </button>
          </div>
        </div>

        {response && (
          <div className="mt-10 w-full p-6 bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
            <h2 className="text-4xl font-bold text-gray-200 mb-4 border-b border-gray-600 pb-2">
              ✨ Generated Question:
            </h2>
            <div className="text-xl leading-relaxed text-gray-300">
              <ReactMarkdown>{response?.question}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

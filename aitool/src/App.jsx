import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]); // Store multiple questions
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("⚠️ Please enter a topic!");

    setLoading(true);
    setQuestions([]); // Clear previous questions before fetching new ones

    try {
      await fetch("http://localhost:5000/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      await GetQuestions();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetQuestions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/previous-questions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setQuestions(data?.previousQuestions || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(questions[0]);

  return (
    <div className="min-h-screen bg-[#242424] flex flex-col items-center p-4">
      <h1 className="text-7xl text-white uppercase font-bold mb-4">
        Coding Question Generator
      </h1>

      <div className="flex items-center gap-2">
        <div>
          <label className="block text-lg font-medium text-white mb-1">
            Topic:
          </label>
          <input
            type="text"
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-1">
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="Easy">🟢 Easy</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Hard">🔴 Hard</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="py-2.5 px-5 mt-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Question"}
      </button>

      {questions.length > 0 && (
        <div className="mt-10 w-full p-6  rounded-lg shadow-lg">
          <h2 className="text-6xl font-bold text-gray-200 mb-4 border-b border-gray-600 pb-2">
            Coding Questions
          </h2>
          <div className="text-lg leading-relaxed text-gray-300">
            {questions?.map((q, index) => (
              <div key={index}>
                {q?.map((item, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="text-4xl font-semibold text-blue-300">
                      {item?.title}
                    </h3>
                    <p className="mt-2 text-lg leading-relaxed">
                      {item?.problemStatement}
                    </p>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-100">
                        Constraints:
                      </h4>
                      <p className="text-gray-400">{item?.constraints}</p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-100">
                        Expected Input:
                      </h4>
                      <p className="text-gray-400">{item?.expectedInput}</p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-100">
                        Expected Output:
                      </h4>
                      <p className="text-gray-400">{item?.expectedOutput}</p>
                    </div>

                    {/* Loop through the inner array (if it exists) */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

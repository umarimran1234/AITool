import { useState } from "react";
import Swal from "sweetalert2";
import Header from "./header";
function Home() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extraText, setExtraTExt] = useState();
  const options = ["Easy", "Hard", "Medium"];
  const handleGenerate = async () => {
    if (!topic.trim())
      return Swal.fire({
        icon: "info",
        title: "Topic is required",
      });
    if (!difficulty)
      return Swal.fire({
        icon: "info",
        title: "Difficulty is required",
      });
    // const invalidTopicPattern = /^[a-zA-Z\s]+$/;
    // if (!invalidTopicPattern.test(topic)) {
    //   return Swal.fire({
    //     title: "Invalid Topic",
    //     text: "Please enter a valid topic.",
    //     icon: "error",
    //     confirmButtonText: "Okay",
    //   });
    // }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      const data = await res.json();

      setQuestions(data?.question || []);
      setExtraTExt(data?.introductoryText);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };
  const highlightNumbers = (text) => {
    if (!text) return null;

    return text
      .split(/(\b\d+\b|\b(?:true|false)\b|[-+*/=]|\b[a-zA-Z]+\d+\b)/gi)
      .map((part, index) => {
        if (/^(true|false)$/i.test(part)) {
          return (
            <span key={index} className=" text-white font-bold px-1">
              "{part}"
            </span>
          );
        } else if (/^\d+$/.test(part)) {
          return (
            <span key={index} className="  text-white font-bold  px-0.5">
              "{part}"
            </span>
          );
        } else if (/\b[a-zA-Z]+\d+\b/.test(part)) {
          return (
            <span key={index} className="text-white px-1 font-bold  ">
              {part}
            </span>
          );
        }

        return <span key={index}>{part}</span>;
      });
  };

  return (
    <>
      <Header />
      <div className=" h-full justify-center mt-36 bg-[#242424] flex flex-col items-center p-4">
        <h1 className="lg:text-7xl text-4xl  text-center text-white uppercase font-bold mb-4">
          Coding Question Generator
        </h1>

        <div className="flex items-center gap-2">
          <div>
            <label
              className="block text-lg font-medium text-white mb-1"
              htmlFor="topic"
            >
              Topic:
            </label>
            <input
              id="topic"
              type="text"
              placeholder="Enter a topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="block text-lg font-medium text-white mb-1"
            >
              Difficulty:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              required
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>select</option>
              {options?.map((item, index) => (
                <>
                  <option key={index} value={item}>
                    {item}
                  </option>
                </>
              ))}
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

        {Array.isArray(questions) && questions?.length > 0 ? (
          <div className="mt-10 w-full p-6 rounded-lg shadow-lg">
            <h2 className="lg:text-6xl text-4xl font-bold text-center uppercase text-gray-200 mb-4 border-b border-gray-600 pb-2">
              Coding Questions
            </h2>
            <div className="text-lg leading-relaxed text-gray-300">
              <p className=" mx-3 "> {extraText} </p>
              {loading === true ? (
                <div className=" flex justify-center ">
                  <svg
                    role="status"
                    className="w-70 h-70 mr-2 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid meet"
                    height="80"
                    width="80"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="15"
                      d="M50 10C29.05 10 15 24.81 15 40C15 55.19 29.05 70 50 70C70.95 70 85 55.19 85 40C85 24.81 70.95 10 50 10ZM50 10L50 10C50 10 50 10 50 10ZM50 10C29.05 10 15 24.81 15 40C15 55.19 29.05 70 50 70C70.95 70 85 55.19 85 40C85 24.81 70.95 10 50 10Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                questions?.map((q, index) => (
                  <div key={index} className="mb-8">
                    <div className="mb-6">
                      <h3 className="lg:text-5xl my-7  text-2xl   font-bold text-blue-400  uppercase">
                        {`Q:${q?.title}`}
                      </h3>
                      <h4 className=" text-2xl font-semibold text-gray-100">
                        Problem Statement:
                      </h4>
                      <p className="mt-2 text-lg leading-relaxed text-gray-100">
                        {highlightNumbers(q?.problemStatement)}
                      </p>
                      <div className="mt-4">
                        <h4 className=" text-2xl font-semibold text-gray-100">
                          Constraints:
                        </h4>
                        <p className="text-gray-100">
                          {highlightNumbers(q?.constraints)}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold text-2xl text-gray-100">
                          Expected Input:
                        </h4>
                        <p className="text-gray-100  ">
                          {highlightNumbers(q?.expectedInput)}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className=" text-2xl font-semibold text-gray-100">
                          Expected Output:
                        </h4>
                        <p className="text-gray-100">
                          {highlightNumbers(q?.expectedOutput)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10 w-full p-6 rounded-lg shadow-lg text-center text-gray-300">
            <h2 className="text-4xl font-semibold text-red-300 font-bold ">
              No questions found
            </h2>
            <p className="text-lg mt-2">
              Create some questions to get started!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

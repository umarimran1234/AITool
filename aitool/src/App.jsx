// import { useState } from "react";

// import Swal from "sweetalert2";
import Home from "./components/home/page";

function App() {
  // const [topic, setTopic] = useState("");
  // const [difficulty, setDifficulty] = useState("");
  // const [questions, setQuestions] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [extraText, setExtraTExt] = useState();
  // const options = ["Easy", "Hard", "Medium"];

  // const handleGenerate = async () => {
  //   if (!topic.trim())
  //     return Swal.fire({
  //       icon: "info",
  //       title: "Topic is required",
  //     });

  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://localhost:5000/api/generate-question", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ topic, difficulty }),
  //     });

  //     const data = await res.json();
  //     setQuestions(data?.question || []);
  //     setExtraTExt(data?.introductoryText);
  //   } catch (error) {
  //     Swal.fire({
  //       title: "Error",
  //       text: `${error}`,
  //       icon: "error",
  //       confirmButtonText: "Okay",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const highlightNumbers = (text) => {
  //   if (!text) return null;

  //   return text
  //     .split(/(\b\d+\b|\b(?:true|false)\b|[-+*/=]|\b[a-zA-Z]+\d+\b)/gi)
  //     .map((part, index) => {
  //       if (/^(true|false)$/i.test(part)) {
  //         return (
  //           <span key={index} className=" text-white font-bold px-1">
  //             "{part}"
  //           </span>
  //         );
  //       } else if (/^\d+$/.test(part)) {
  //         return (
  //           <span key={index} className="  text-white font-bold  px-0.5">
  //             "{part}"
  //           </span>
  //         );
  //       } else if (/\b[a-zA-Z]+\d+\b/.test(part)) {
  //         return (
  //           <span key={index} className="text-white px-1 font-bold  ">
  //             {part}
  //           </span>
  //         );
  //       }

  //       return <span key={index}>{part}</span>;
  //     });
  // };

  return (
    <>
      <Home />
    </>
  );
}

export default App;

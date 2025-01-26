import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Handle input changes and fetch corrections in real-time
  const handleInputChange = async (e) => {
    const text = e.target.value;
    setInputText(text);

    if (text.trim() === "") {
      setCorrectedText("");
      return;
    }

    try {
      // Corrected URL path: Ensure that you're pointing to the correct backend endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/spellcheck", // Corrected path to match the Flask backend endpoint
        {
          text,
        }
      );
      setCorrectedText(response.data.corrected_text);
    } catch (error) {
      console.error("Error correcting text:", error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <h1>Real-Time Spell Checker</h1>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your text here..."
        />
        <div className="corrected-output">
          <strong>Corrected Text:</strong>
          <p>{correctedText || "No corrections yet!"}</p>
        </div>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;

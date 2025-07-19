import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import { resultcontext } from "./context";

function Chatbot({allwords,correctword,incorrectwords}) {
  const [answer, setAnswer] = useState("");
  const {resultstate,statechanger}=useContext(resultcontext)
    const [displayedText, setDisplayedText] = useState(""); // For typewriter effect
  useEffect(() => {
    // Only run API call if resultcontext becomes true
    if (resultstate) {
    console.log(allwords)
    console.log(correctword.join(""))
    console.log(incorrectwords.join(""))

    generateAnswer();
    }
  }, [resultstate]); // Triggers only when resultcontext changes
      
  async function generateAnswer() {


    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBawrXC3KQYnk66MU4WdfRD0B-BJJyLGmE",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Here is a typing test result:
                  here are ${allwords}  
 Correct words: ${correctword?correctword:"empty"}  
 Incorrect words: ${incorrectwords}  Write a clear, organized, feedback how you can improve typing speed and accuracy based on provided data give 5-6 sentences.Be honest and brutal no humble but dont be rude if the gave good test appreciate  IF there is no words in correct words or a particular letter is been typed repeatedly then give response "🚫 Your test seems to have been attempted incorrectly. Please reattempt with genuine effort and varied typing. "`,
                },
              ],
            },
          ],
        },
      });
          const fullText = response.data.candidates[0].content.parts[0].text;
      setAnswer(
        fullText
      );

       animateTypewriter(fullText); // Start typewriter effect
    } catch (err) {
      console.error("Error calling Gemini API", err);
      setAnswer("⚠️ Server is down");
    }
  }
function animateTypewriter(text) {
    let i = 0;
    setDisplayedText(""); // Clear any previous text

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval); // Stop when done
      }
    }, 25); // Speed of typing (25ms per character)
  }
  return (
    <div className="chatbot">
   
      <p>{displayedText || "Analyzing your typing skills…"}</p>
    </div>
  );
}

export default Chatbot;

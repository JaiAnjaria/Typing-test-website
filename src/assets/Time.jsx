import { useContext, useEffect, useState } from "react";
import App from "../Result";
import { resultcontext } from "../context";

export default function Time({
  time,
  setExpbool,
  wordchanger,
  correctchar,
  textindex,
  correctwordslength,
  expbool
}) {
  const [newtime, setNewTime] = useState(time);
  const [check, done] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed seconds

  const { resultstate, statechanger } = useContext(resultcontext);

  const accuracy = textindex > 0 ? (correctchar / textindex) * 100 : 0;
  const wpm = elapsedTime > 0 ? (correctwordslength / elapsedTime) * 60 : 0;

  // Start countdown only once
  const handleKeyPress = () => {
    if (!check) {
      done(true);
      const intervalId = setInterval(() => {
        setElapsedTime((prev) => prev + 1);

        setNewTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(intervalId);
            statechanger(true); // Show result
            setExpbool(true); // Mark test as finished
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [check]);

  useEffect(() => {
    // Reset timer if user selects a new time
    setNewTime(time);
    setElapsedTime(0);
    done(false); // Allow timer to restart
  }, [time]);

  const wp = Math.floor(wpm);

  return (
    <>
      <div className="time">
        {newtime}s
        {resultstate ? <App WPM={wpm} acc={accuracy} /> : null}
        <div className="WPM">{wp}</div>
        <div className="wpm-t">WPM</div>
      </div>
    </>
  );
}

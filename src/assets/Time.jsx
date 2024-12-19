import { useContext, useEffect, useState } from "react";
import App from "../Result";
import { resultcontext } from "../context";

export default function Time({ time, setExpbool,wordchanger,correctchar,textindex,correctwordslength,expbool}) {
  const [newtime, setNewTime] = useState(time);
  const [check, done] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Track actual elapsed time
  const [wpmmin,minconverter]=useState(0)
 var accuracy= textindex > 0 ? (correctchar / textindex) * 100 : 0;
 const wpm = elapsedTime > 0 ? (correctwordslength / elapsedTime) * 60 : 0;
const {resultstate,statechanger}=useContext(resultcontext)
 useEffect(() => {
  if (time === 60) {
      minconverter(1);
      return;
  }
  if (time === 30) {
      minconverter(0.5);
      return;
  }
  if (time === 90) {
      minconverter(1.5);
      return;
  }
}, [time]); 
console.log(elapsedTime)
console.log(accuracy)
console.log(wpm)
  const handleKeyPress = () => {
    if (!check) {
      done(true);
      const intervall = setInterval(() => {
        setElapsedTime((prevElapsed) => prevElapsed + 1);
        setNewTime((prevTime) => {
   
          if (prevTime === 1) {
            clearInterval(intervall);
           statechanger(true)
            setExpbool(true);  // Set the expbool to true when time is up
        
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };
  

  useEffect(() => {
    if (
      (newtime >= 0 && newtime < 30) || 
      (newtime > 30 && newtime < 60) || 
      (newtime > 60 && newtime < 90)
    ) {
  wordchanger(true)
      // Valid range, do nothing or handle accordingly
    } else {
      // Update newTime if it's out of the valid range
      setNewTime(time);
    }
  }, [newtime, time]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [check]);
 var wp=Math.floor(wpm)
  return ( 
    <div className="time">
      {newtime}s 
   
      {resultstate ? <App WPM={wpm} acc={accuracy} /> : null}
      <div className="WPM">{wp}</div>
      <div className="wpm-t">WPM</div>

    </div>

  );
}

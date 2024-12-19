import React, { useState, useEffect } from "react";

function Result({ WPM, acc }) {
  const [wpmeter, setWpmeter] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
   const WpmInterval= setInterval(()=>{
       setWpmeter((prev)=>{
        if(prev<WPM){
          return prev+1
        }
        else{
          clearInterval(WpmInterval)
          return prev
        }
       })
   },25)
  },[WPM])

  useEffect(() => {
    const accInterval = setInterval(() => {
      setAccuracy((prev) => {
        if (prev < acc) {
          return prev+1; // Increment towards accuracy
        }
        clearInterval(accInterval);
        return prev;
      });
    },15); // Adjust interval as needed

    return () => clearInterval(accInterval); // Cleanup on unmount
  }, [acc]);

  return (
    <div className="Result">
      <div className="Result-txt ml-20 mr-20 pb-1">RESULT</div>
      <div className="flex justify-between">
        <div>WPM</div>
        <div className="mr-8">{wpmeter}</div>
      </div>
      <div className="flex justify-between">
        <div>Accuracy</div>
        <div className="ml-10">{accuracy}%</div>
      </div>
    </div>
  );
}

function App(props) {
  const [targetWPM, setTargetWPM] = useState(props.WPM); // Example target WPM
  const [targetAcc, setTargetAcc] = useState(props.acc); // Example target accuracy

  return (
        <div >

      <Result WPM={targetWPM} acc={targetAcc} />
    </div>
  );
}

export default App;
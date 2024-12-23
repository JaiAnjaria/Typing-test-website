import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { paragraph } from "txtgen";
import Time from "./assets/Time";
import Header from "./header";
import { generate } from "random-words";
import App from "./Result";
import { counterContext } from "./context";
import {resultcontext } from "./context";
import refresh from './assets/refresh.svg'
import { faker } from "@faker-js/faker";
 function Hero() {


// Function to generate a sentence of a specific length
const generateLongSentence = (wordCount) => {
  const usedWords = new Set(); // To track used words
  const sentence = [];

  for (let i = 0; i < wordCount; i++) {
    let word;
    do {
      word = faker.word.noun(); // Generate a random word
    } while (usedWords.has(word)); // Ensure word hasn't been used

    usedWords.add(word); // Mark word as used
    sentence.push(word);
  }

  return sentence.join(" ");
};

// Generate a sentence with 500 words
const longSentence = generateLongSentence(45);
let arr=paragraph().split(' ').slice(0,50)
 const result= []
 arr.map((words,index)=>{
   result.push(words)
  
   if(index%Math.floor(Math.random()*10)==0){
    result.push(Math.floor(Math.random()*100))
   }

 })

result.join(' ').replace('However',generate())
  const bannedWords = ["however", "have begun to rent"];
  const hero = useRef();
  const whole=useRef();
  const [resultstate, statechanger] = useState(false);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [time, setTime] = useState(30);
  const [toggle, settoggle] = useState(false);
  const [expbool, setExpbool] = useState(false);
  const [word, wordchanger] = useState(false); // Use state for expbool
  const [textindex,handletxt]=useState(0)
  const [correctchar,correctcharcheck]=useState(0)
  const [correctwords, setCorrectwords] = useState([]);



  let punctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g;
  document.onreadystatechange = function () {
            if (document.readyState !== "complete") {
                document.querySelector(
                    "body").style.visibility = "hidden";
                document.querySelector(
                    "#loader").style.visibility = "visible";
            } else {
                document.querySelector(
                    "#loader").style.display = "none";
                document.querySelector(
                    "body").style.visibility = "visible";
            }
        };
  // Handle styling for key press
  const Keypresstyle = {
    transform: "translateY(3px)",
    boxShadow: "0 2px #000, 0 6px 10px rgba(0, 0, 0, 0.7)", // Use camelCase for box-shadow
    backgroundColor: "#555", // Use camelCase for background-color
  };
  window.addEventListener('load', function() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
});
  if (expbool) {

    hero.current.style.filter = "blur(5px)"; // Apply blur when expbool is true

  }

  let text = useRef(
    longSentence
  );

  const initialKeyState = {
    "~": false,
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "0": false,
    "-": false,
    "=": false,
    q: false,
    w: false,
    e: false,
    r: false,
    t: false,
    y: false,
    u: false,
    i: false,
    o: false,
    p: false,
    "[": false,
    "]": false,
    "\\": false,
    a: false,
    s: false,
    d: false,
    f: false,
    g: false,
    h: false,
    j: false,
    k: false,
    l: false,
    ";": false,
    "'": false,
    z: false,
    x: false,
    c: false,
    v: false,
    b: false,
    n: false,
    m: false,
    ",": false,
    ".": false,
    "/": false,
    "Backspace": false,
    "Tab": false,
    "CapsLock": false,
    "Shift": false,
    "Ctrl": false,
    "Alt": false,
  };

  const [keyState, setKeyState] = useState(initialKeyState);

  // Handle keydown event
  function handleKeyDown(event) {

    const keyPressed = event.key.toLowerCase();
    const currentChar = text.current[textindex];
       if(wordslength==textindex){
        setExpbool(true)
         statechanger(true)
       }
    if(event.key=="Backspace"){
    return
    }
if(event.key=='Shift' || event.key=='CapsLock' || event.key=='Control' || event.key=='Enter' || event.key=='ArrowUp' || event.key=='ArrowDown' || event.key=='ArrowRight'|| event.key=='ArrowLeft'){
  return
}

    if (event.key === currentChar) {
      correctcharcheck((prevchar)=>prevchar+1)
   setCorrectwords((prev)=>[...prev,event.key])

       
        
      handletxt((prevIndex) => prevIndex + 1); // Move to next index

    } else {
      
      setIncorrectIndices((prev) => [...prev, textindex]); 
      handletxt((prevIndex) => prevIndex + 1);
     
    }

    // Optional: Test completion
    if (textindex + 1 === text.current.length) {
      console.log("Test completed!");
    }


    // Prevent space key default behavior
    if (event.keyCode === 32 && event.target === document.body) {
      event.preventDefault();
    }

    setKeyState((prevState) => ({
      ...prevState,
      [keyPressed]: true,
    }));
  }

  async function textrender(textopt) {
    if( textopt=='QUOTES')

      {  text.current='                  '
        settoggle((prev)=>!prev)
        const response=await axios.get('https://api.api-ninjas.com/v1/quotes?',{headers:{'X-Api-Key':'4GoZaIcFChu0W9D+jcwdoQ==NoetWnQPu2JqL2Yg'}})
    
    
     
       console.log(text.current.length)
       text.current=   response.data[0].quote            
                
              settoggle((prev)=>!prev)
    
            return }
         if(textopt=='WORDS')
     {    

      text.current=generateLongSentence(40)
        settoggle((prev)=>!prev)
        return
     }
     if(textopt=='NUMBERS'){
      settoggle((prev)=>!prev)
   
          text.current=result.join(' ').replace('However',generate())
          console.log(response)
          settoggle((prev)=>!prev)
          return
     }
     if(textopt=='PUNCTUATION'){
 
      settoggle((prev)=>!prev)
      const response=await axios.get('https://typing-test-website-2rjt.vercel.app/Punctuation')
          text.current=response.data.Ptext
          console.log(response)
          settoggle((prev)=>!prev)
          return
     }
    // Rendering logic as before...
  }
  function charcheck(event) {
    // Character checking logic...
    const arr= text.current.split('')
  const key=event.key
  arr.map((char)=>{

    
  })
  }

  

  // Handle keyup event
  function handleKeyUp(event) {
    const keyPressed = event.key.toLowerCase();

    setKeyState((prevState) => ({
      ...prevState,
      [keyPressed]: false,
    }));
  }

  function timeupdate(timer) {
    setTime(Number(timer)); // Convert string to number
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", charcheck);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", charcheck);
    };
  }, []);
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [textindex]);
 function refreshimg(){
  location.reload();

 }
var wordslength=text.current.length-1
console.log(wordslength)
var correctwordslength=correctwords.join('').split(/\s+/).length
  return (
    <>
    <counterContext.Provider value={word} >
      <resultcontext.Provider value={{resultstate,statechanger}} >
      <Header ontimechange={timeupdate} onclick={textrender} />
      <div  ref={whole}className="hero  px-40 pt-20">
        <Time time={time} setExpbool={setExpbool}  wordchanger={wordchanger}
        correctchar={correctchar} textindex={textindex} correctwordslength={correctwordslength} expbool={expbool}/>
       <div className="herodiv px-8">
        <div ref={hero}>{text.current.split('').map((char,index)=>
          <span className={!expbool?incorrectIndices.includes(index)
            ? "incorrect" // Incorrect character
            : index < textindex
            ? "correct" // Correctly typed characters
            : index === textindex // Blinking effect for the next character
            ? "current" 
            : undefined:undefined // Default for untyped characters
          } key={index}  >{char}</span>
        )}</div></div>
        <img onClick={refreshimg} className='refresh'src={refresh}></img>
     
      </div>

<body>
<div id="loader">
        <div class="spinner"></div>
    </div>

       <div className="keyboard h-0">
  <div className="row flex justify-center">
    <div className="key" onClick={charcheck} style={keyState['~'] ? Keypresstyle : undefined}>~</div>
    <div className="key" onClick={charcheck} style={keyState['1'] ? Keypresstyle : undefined}>1</div>
    <div className="key" onClick={charcheck} style={keyState['2'] ? Keypresstyle : undefined}>2</div>
    <div className="key" onClick={charcheck} style={keyState['3'] ? Keypresstyle : undefined}>3</div>
    <div className="key" onClick={charcheck} style={keyState['4'] ? Keypresstyle : undefined}>4</div>
    <div className="key" onClick={charcheck} style={keyState['5'] ? Keypresstyle : undefined}>5</div>
    <div className="key" onClick={charcheck} style={keyState['6'] ? Keypresstyle : undefined}>6</div>
    <div className="key" onClick={charcheck} style={keyState['7'] ? Keypresstyle : undefined}>7</div>
    <div className="key" onClick={charcheck} style={keyState['8'] ? Keypresstyle : undefined}>8</div>
    <div className="key" onClick={charcheck} style={keyState['9'] ? Keypresstyle : undefined}>9</div>
    <div className="key" onClick={charcheck} style={keyState['0'] ? Keypresstyle : undefined}>0</div>
    <div className="key" onClick={charcheck} style={keyState['-'] ? Keypresstyle : undefined}>-</div>
    <div className="key" onClick={charcheck} style={keyState['='] ? Keypresstyle : undefined}>=</div>
    <div className="key key-large" onClick={charcheck} style={keyState['Backspace'] ? Keypresstyle : undefined}>Backspace</div>
  </div>

  <div className="row flex justify-center">
    <div className="key key-large" onClick={charcheck} style={keyState['Tab'] ? Keypresstyle : undefined}>Tab</div>
    <div className="key" onClick={charcheck} style={keyState['q'] ? Keypresstyle : undefined}>Q</div>
    <div className="key" onClick={charcheck} style={keyState['w'] ? Keypresstyle : undefined}>W</div>
    <div className="key" onClick={charcheck} style={keyState['e'] ? Keypresstyle : undefined}>E</div>
    <div className="key" onClick={charcheck} style={keyState['r'] ? Keypresstyle : undefined}>R</div>
    <div className="key" onClick={charcheck} style={keyState['t'] ? Keypresstyle : undefined}>T</div>
    <div className="key" onClick={charcheck} style={keyState['y'] ? Keypresstyle : undefined}>Y</div>
    <div className="key" onClick={charcheck} style={keyState['u'] ? Keypresstyle : undefined}>U</div>
    <div className="key" onClick={charcheck} style={keyState['i'] ? Keypresstyle : undefined}>I</div>
    <div className="key" onClick={charcheck} style={keyState['o'] ? Keypresstyle : undefined}>O</div>
    <div className="key" onClick={charcheck} style={keyState['p'] ? Keypresstyle : undefined}>P</div>
    <div className="key" onClick={charcheck} style={keyState['['] ? Keypresstyle : undefined}>[</div>
    <div className="key" onClick={charcheck} style={keyState[']'] ? Keypresstyle : undefined}>]</div>
    <div className="key" onClick={charcheck} style={keyState['\\'] ? Keypresstyle : undefined}>\</div>
  </div>

  <div className="row flex justify-center">
    <div className="key key-large" onClick={charcheck} style={keyState['CapsLock'] ? Keypresstyle : undefined}>CapsLock</div>
    <div className="key" onClick={charcheck} style={keyState['a'] ? Keypresstyle : undefined}>A</div>
    <div className="key" onClick={charcheck} style={keyState['s'] ? Keypresstyle : undefined}>S</div>
    <div className="key" onClick={charcheck} style={keyState['d'] ? Keypresstyle : undefined}>D</div>
    <div className="key" onClick={charcheck} style={keyState['f'] ? Keypresstyle : undefined}>F</div>
    <div className="key" onClick={charcheck} style={keyState['g'] ? Keypresstyle : undefined}>G</div>
    <div className="key" onClick={charcheck} style={keyState['h'] ? Keypresstyle : undefined}>H</div>
    <div className="key" onClick={charcheck} style={keyState['j'] ? Keypresstyle : undefined}>J</div>
    <div className="key" onClick={charcheck} style={keyState['k'] ? Keypresstyle : undefined}>K</div>
    <div className="key" onClick={charcheck} style={keyState['l'] ? Keypresstyle : undefined}>L</div>
    <div className="key" onClick={charcheck} style={keyState[';'] ? Keypresstyle : undefined}>;</div>
    <div className="key" onClick={charcheck} style={keyState["'"] ? Keypresstyle : undefined}>'</div>
    <div className="key key-large" onClick={charcheck} style={keyState['Enter'] ? Keypresstyle : undefined}>Enter</div>
  </div>

  <div className="row flex justify-center">
    <div className="key key-large" onClick={charcheck} style={keyState['Shift'] ? Keypresstyle : undefined}>Shift</div>
    <div className="key" onClick={charcheck} style={keyState['z'] ? Keypresstyle : undefined}>Z</div>
    <div className="key" onClick={charcheck} style={keyState['x'] ? Keypresstyle : undefined}>X</div>
    <div className="key" onClick={charcheck} style={keyState['c'] ? Keypresstyle : undefined}>C</div>
    <div className="key" onClick={charcheck} style={keyState['v'] ? Keypresstyle : undefined}>V</div>
    <div className="key" onClick={charcheck} style={keyState['b'] ? Keypresstyle : undefined}>B</div>
    <div className="key" onClick={charcheck} style={keyState['n'] ? Keypresstyle : undefined}>N</div>
    <div className="key" onClick={charcheck} style={keyState['m'] ? Keypresstyle : undefined}>M</div>
    <div className="key" onClick={charcheck} style={keyState[','] ? Keypresstyle : undefined}>,</div>
    <div className="key" onClick={charcheck} style={keyState['.'] ? Keypresstyle : undefined}>.</div>
    <div className="key" onClick={charcheck} style={keyState['/'] ? Keypresstyle : undefined}>/</div>
    <div className="key key-large" onClick={charcheck} style={keyState['Shift'] ? Keypresstyle : undefined}>Shift</div>
  </div>

  <div className="row flex justify-center">
    <div className="key key-large" onClick={charcheck} style={keyState['Ctrl'] ? Keypresstyle : undefined}>Ctrl</div>
    <div className="key key-medium" onClick={charcheck} style={keyState['Alt'] ? Keypresstyle : undefined}>Alt</div>
    <div className="key key-space" onClick={charcheck} style={keyState[' '] ? Keypresstyle : undefined}>Space</div>
    <div className="key key-medium" onClick={charcheck} style={keyState['Alt'] ? Keypresstyle : undefined}>Alt</div>
    <div className="key key-large" onClick={charcheck} style={keyState['Ctrl'] ? Keypresstyle : undefined}>Ctrl</div>
  </div>
</div>
</body>
</resultcontext.Provider>
</counterContext.Provider>
</>

  );
}
export default Hero;

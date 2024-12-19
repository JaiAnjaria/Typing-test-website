import React ,{ useContext, useRef, useState } from 'react';
import { counterContext } from './context';

export default function Header(props){
  const [hover,hstate]=useState(false)
  const [sec,newsec]=useState(1)
  const [navindex,statenav]=useState();
  const val=useContext(counterContext)

  const navItems = ["WORDS", "PUNCTUATION", "QUOTES", "NUMBERS"];
 function handlechange(event){
const timeselected=event.target.value;
props.ontimechange(timeselected);
 }
function handlenavclick(event,index){
   props.onclick(val?null:event.target.innerText)
   console.log(event.target.innerText)
  statenav(index)


}
  function secoptions(){

  return(
   <> <select onChange={handlechange}className='select'>
    <option className="select-option" value=""
      >select</option>
    <option className="select-option" value="30"
      >30</option>
    <option className="select-option"  value="60">60</option>
    <option className="select-option"  value="90">90</option>

  </select></>
  )
     
  }

 return (<>
   <div className="navbar">
     <div className='flex w-3/4 uppercase   justify-between align-center py-2 mr-62 px-5 nav-bel mt-8 '>
      <div className='flex  ' ><div className='font-medium text-3xl'>TURBOTYPE</div>  </div> 
                              <div  className='flex  optt'>

                              {navItems.map((item,index)=> <div style={{backgroundColor:val?undefined: navindex === index ? "white" : undefined, // Active div gets blue color
         color:val?undefined
         : navindex === index ? "black" : undefined}}  key={index} onClick={(event) => handlenavclick(event, index)}>{item}</div>) } 
                                       
                                       
                                        </div>
                                        <div>
                                        <div onMouseEnter={()=>hstate(true)}
                                          onMouseLeave={()=>hstate(false)}
                                          
                                        className='Seconds mr-10'  >
                                        Time {hover && secoptions()}
                                        </div>
                                        </div> 
                                       
                                      
                                        
   </div>
  
  <hr></hr>

   </div>
</>);
}

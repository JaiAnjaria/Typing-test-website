let arr=paragraph().split(' ').slice(0,60)
 const result= []
 arr.map((words,index)=>{
   result.push(words)
  
   if(index%Math.floor(Math.random()*10)==0){
    result.push(Math.floor(Math.random()*100))
   }

 })

 let finaltxt=result.join(' ').replace('However',generate())
import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import { paragraph } from "txtgen";
import { generate } from "random-words";
import cors from 'cors';


const app = express();
const port = 3000;
const db = new pg.Client({
  user:'postgres',
  host:'localhost',
  database:'Typing_project',
  password:'Jaiisop412',
  port:5432,

})
db.connect();
app.use(cors({origin:['https://typing-test-website-2rjt.vercel.app/']
             method:['POST','GET']
              credentials:true
}
            
            ));
app.get('/numbers',(req,res)=>{
  let arr=paragraph().split(' ').slice(0,60)
 const result= []
 arr.map((words,index)=>{
   result.push(words)
  
   if(index%Math.floor(Math.random()*10)==0){
    result.push(Math.floor(Math.random()*100))
   }

 })

 let finaltxt=result.join(' ').replace('However',generate())

 res.json({finaltxt})

})


app.get('/Punctuation',async(req,res)=>
{
  let dbrandom=Math.floor(Math.random()*96) 
const output=await db.query('select text from public."Ptext" where id=$1',[dbrandom])
const Ptext=output.rows[0].text
res.json( {Ptext})

})
app.listen(port,()=>{
  console.log(`app listening on ${port}`)
})

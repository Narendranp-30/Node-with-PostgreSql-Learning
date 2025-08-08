const {Client} =require('pg')
const express=require('express')
const app=express()
app.use(express.json())

const con=new Client({
    host:'localhost',
    user:'postgres',
    post:5432,
    password:'Narendra@123',
    database:"nodedb"

})

con.connect().then(()=> console.log("connected"))

app.post('/postData',(req,res)=>{
    const {name,id}=req.body

    const insert='INSERT INTO node_table VALUES($1,$2)'
    con.query(insert,[name,id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.send("Data inserted")
        }
    }
    )
})

app.listen(8080,()=>{
    console.log("server is running")
})
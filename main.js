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

app.get('/getData',(req,res)=>{
    const select='SELECT * FROM node_table'
    con.query(select,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result.rows) 
        }
    })
})


app.get('/getDataById/:id',(req,res)=>{
    const id=req.params.id
    const select='SELECT * FROM node_table WHERE id=$1'
    con.query(select,[id],(err,result)=>{
         if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result.rows[0]) 
        }
    })
})


app.put('/updateData/:id',(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const update='UPDATE node_table SET name=$1 WHERE id=$2'
    con.query(update,[name,id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.send("Data updated")
        }
    })
})

app.delete('/deleteData/:id',(req,res)=>{
    const id=req.params.id;
    const deleteData='DELETE FROM node_table WHERE id=$1'
    con.query(deleteData,[id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
          
            res.send(result)
        }
    })
})

app.listen(8080,()=>{
    console.log("server is running")
})
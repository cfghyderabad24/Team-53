//create express app
const exp=require('express');
const app=exp()
const cors=require('cors')
require('dotenv').config()//process.env.PORT
const mongoClient=require('mongodb').MongoClient;
const path=require('path')
//deploy react build in this server
app.use(exp.static(path.join(__dirname,"../client/build")))
app.use(cors())
//to parse the body
app.use(exp.json())
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const cfg24=client.db('cfg24')
    const adminscollection=cfg24.collection('adminscollection');
    
    
    app.set('adminscollection',adminscollection);
    console.log("Db connection success");



})
.catch(err=>console.log("err in DB connection",err))
const adminApp=require('./APIs/admin-api')


app.use('/admin-api',adminApp)
app.use((req,res,next)=>
    {
        res.sendFile(path.join(__dirname,'../client/public/index.html'))
        

    })
    app.use((err,req,res,next)=>{
        res.send({message:"error",payload:err.message})
    })
    const port=process.env.PORT || 5000;
    //assign port number
    app.listen(port,()=>console.log(`web server on port ${port}`)) 
/* ============================REQUIRE============================ */
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const cookeParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn.js')



/*========================CONFIGARATION========================*/
dotenv.config()



/*============================PORT============================*/
const PORT = process.env.PORT || 3500




/*==========================Middleware==========================*/
app.use(express.json())
app.use(cors())
app.use(cookeParser())



app.use('/',express.static(path.join(__dirname,'public')))
app.use('/',require('./routes/root.js'))
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 Not Found'})
    }else{
        res.type('text').send('404 Not Found')
    }
})

/*=========================ROUTES=========================*/






/* ===========================LISTENING TO THE SERVER=========================== */
connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`Server is running on port : ${PORT}`))
}).catch((err)=>console.log(err))

// mongoose.connection.once('open',()=>{
//     console.log("Connected")
//     app.listen(PORT,()=>console.log(`Server is running on port : ${PORT}`))
// })

// mongoose.connection.on('error',err=>{
//     console.log(err)
// })
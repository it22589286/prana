const express =require ('express');
const {mongoose }= require('mongoose')
const dotenv =require('dotenv').config()
const cors = require('cors');
const cookieParser =require('cookie-parser')
const LeaveRoute = require('./Routes/leaveroute')



const app = express();

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('database connected'))
.catch((err)=> console.log('database not connected',err))

//middleware

app.use(express.json())
//app.use(cookieParser())
//app.use(express.urlencoded({extended:false}))




app.use('/',require('./Routes/routes'))
app.use('/promopackage',require('./Routes/promo-routes'))
app.use('/api/leave',LeaveRoute)


const port =8000;
app.listen(port,()=>console.log(`server is running on port ${port}`))
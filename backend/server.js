const express =require ('express');
const dotenv =require('dotenv').config()
const cors = require('cors')


const app = express();


const port =8000;
app.listen(port,()=>console.log(`server is running on port ${port}`))
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const traingRoutes = require("./routes/trainingroutes");
const cardRoutes = require("./routes/cardroutes");

const app=express()

app.use(cors())
app.use(express.json())
app.use("/", traingRoutes);
app.use("/", cardRoutes);

const PORT=process.env.PORT||8020








mongoose.connect("mongodb+srv://pranayoga880:sxYO9ogPES9iHJDI@clusterprana.wzi1ztv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPrana")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})


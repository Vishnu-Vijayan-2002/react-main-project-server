import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cardRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config
const app =express()
const port =4000


// middelware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use('/api/user',userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
   res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})
//mongodb+srv://vishnuvijayan9645447054:vishnuvijayan0077@cluster0.vv5jplc.mongodb.net/?
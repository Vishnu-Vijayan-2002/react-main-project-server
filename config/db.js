import mongoose  from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://vishnuvijayan9645447054:vishnuvijayan0077@cluster0.vv5jplc.mongodb.net/food-del').then(()=>{
        console.log("db conneted");
    })
}
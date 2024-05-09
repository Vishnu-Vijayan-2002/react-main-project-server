import mongoose from "mongoose";
const fooSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    category:{type:String,require:true},
    image:{type:String,require:true},
})
const foodModel=mongoose.models.food ||  mongoose.model("food",fooSchema);
export default foodModel;
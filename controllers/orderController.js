import oderModel from "../models/oderModel.js";
import userModel from "../models/userModel.js";
import { Stripe } from 'stripe';

const stripe =new  Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder=async(req,res)=>{
    const frontend_url="http://localhost:5174"
  
    try{
        const newOrder =new oderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items=req.body.items.map((item)=>({
          price_data:{
            currency:'inr',
           product_data:{
            name:item.name
           },
           unit_amount:item.price*100
          },
          quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})

    }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}
const verifyOder=async(req,res)=>{
     const {orderId,success}=req.body;
     try{
       if(success=="true"){
          await oderModel.findByIdAndUpdate(orderId,{payment:true});
          res.json({success:true,message:"Paid"})
       }else{
        await oderModel.findByIdAndDelete(orderId)
        res.json({success:false,message:"Not Paid"})
       }
     }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
     }
}
// user orders for frontend
const userOrders=async(req,res)=>{
    try{
        const orders=await oderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})

    }catch(error){
         console.log(error);
         res.json({success:false,message:'Error'})
    }
}
// listing order for admin panel
const listOrder=async(req,res)=>{
    try{
        const orders=await oderModel.find({});
        res.json({success:true,data:orders})

    }catch(error){
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}
// api for updataing oder status
const updateStatus=async(req,res)=>{
    try{
    await oderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
    }catch(error){
        res.json({success:false,message:"Error"})
    }
}
export  {placeOrder,verifyOder,userOrders,listOrder,updateStatus}
import express from 'express'
import { addFood, listFood, removeItem } from '../controllers/foodController.js'
import multer from 'multer'


const foodRouter=express.Router();

// image storage engine

const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cd)=>{
    return cd(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:Storage})


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeItem)


export default foodRouter
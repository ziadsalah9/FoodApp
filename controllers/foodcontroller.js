import { Console } from "console";
import foodmodel from "../models/Foodmodel.js";

import fs from "fs";



// add food item

const addFood = async (req, res) => {
    try {
        let image_filename = req.file.filename /* ? req.file.filename : null */;
        const food = new foodmodel({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            image:`/images/${image_filename}` 
            
        });

        console.log(image_filename)
        await food.save();
        res.json({ success: true, message: "Food Added!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};


// get all

const listfood = async function (req,res) {

    try {
        
        const foods = await foodmodel.find({});
        res.json({success:true ,data : foods });
    } catch (error) {
        console.log(error)
        res.json({success:false ,message:"error"})
    }
    
}


// remove 
const del = async (req, res )=>{

try {
    const food = await foodmodel.findById(req.body.id);
    fs.unlink(`uploads/${req.image}`,()=>{})

    await foodmodel.findByIdAndDelete(req.body.id);
    res.json({success:true , message :"food deleted successfully !!"})
    
} catch (error) {
    
    console.log(error)
    res.json({success:false,message:"failed deleted !"})
}

}


// remove all 
const deleteall = async (req,res)=>{
    try {
        
        const result  = await foodmodel.deleteMany({});
        res.json({success:true , message :"ALL food deleted successfully !!"})
        Console.log(result);

        const bodyLength = JSON.stringify(res.body).length;

        for (let index = 0; index <bodyLength; index++) {
            fs.unlink(`uploads/${res.image}`,()=>{})            
        }
        


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"faild"})
    }
}

export {addFood,listfood,del,deleteall}

import express from "express"
import { addFood, del, deleteall, listfood } from "../controllers/foodcontroller.js";
import multer  from "multer";

const foodRouter = express.Router();

// image storage engine 

const storage = multer.diskStorage(
{
    destination : "uploads",
    filename : (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
}
);


const upload = multer({storage : storage});


foodRouter.post('/add',(req, res, next) => {
    console.log(req)
    next()
}, upload.single("image"),addFood);

foodRouter.get("/list", listfood);
foodRouter.post("/remove",del)
foodRouter.post("/removeall",deleteall);






export default foodRouter;
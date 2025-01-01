import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import { config } from "dotenv";
import cartRoutes from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
config()

const app = express();

const Port = 7100 ; 


app.use(express.json());
app.use(cors());

// db connection 

connectdb();


//api endpoints 
app.use("/api/food",foodRouter)
 app.use("/images",express.static("uploads"))
 app.use("/api/user",userRouter);
 app.use("/api/cart",cartRoutes);
 app.use("/api/order",orderRouter);



app.get('/',(req,res)=>{

    res.send("api working")
});

app.listen(Port,()=>{
    console.log(`server started on : http://localhost:${Port}`)
})  





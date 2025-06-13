import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';  
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();



const app = express(); 

app.use(cors());
app.use(bodyParser.json());

//process.env.JWT_SECRET_KEY

app.use((req, res, next) => {
    const tokenString = req.header("Authorization");

    if (tokenString) {
        const token = tokenString.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (!err) {
                req.user = decoded; // Attach decoded token to request
            } else {
                console.error("Invalid token:", err.message); // Log the error
            }
            next(); // Continue processing the request
        });
    } else {
        next(); // Proceed without a token (guest access)
    }
});



mongoose.connect(process.env.MONGO_URL)


.then(() => console.log("Connected to DB"))
.catch((error) => console.log(error));




app.use("/api/product",productRouter);
app.use("/api/user",userRouter);
app.use("/api/order",orderRouter);





app.listen(3000, ()=> {

    console.log("server is running on part 3000");

})








  


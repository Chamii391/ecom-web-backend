import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';  
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';


const app = express(); 

app.use(bodyParser.json());

app.use(
    (req,res,next)=>{
        const tokenString = req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ", "")

            jwt.verify(token, "secret", 
                (err,decoded)=>{
                    if(decoded != null){
                        req.user = decoded
                        next()
                    }else{
                        console.log("invalid token")
                        res.status(403).json({
                            message : "Invalid token"
                        })
                    }
                }
            )

        }else{
            next()
        }
    }
)


mongoose.connect("mongodb+srv://admin:admin123@cluster0.yuoza.mongodb.net/myDatabase?retryWrites=true&w=majority")


.then(() => console.log("Connected to DB"))
.catch((error) => console.log(error));




app.use("/product",productRouter);
app.use("/user",userRouter);



app.listen(3000, ()=> {

    console.log("server is running on part 3000");

})








  


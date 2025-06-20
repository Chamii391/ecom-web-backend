import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createUser(req, res) {

    if(req.body.role == "admin"){
       if(req.user != null){
           if(req.user.role != "admin"){
               res.status(403).json({
                   message : "Unauthorized"
               })
               return
           }
           
       }else{
           res.status(403).json({
               message : "Unauthorized"
           })
       }
    }


    const hashedPassword = bcrypt.hashSync(req.body.password, 10);


    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        password: hashedPassword,
        role: req.body.role
        
    });

    user
    .save()
    .then(() => {
        res.json({
            message: "User Created Successfully",
        });
    })
    .catch((error) => {
       
        res.json({
            message: "Error saving user",
            error: error.message,
        });
    });


}

export function loginUser(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then((newuser) => {
            if (newuser == null){
                res.status(404).json({
                    message : "User Not Found"
                })
            } 
            else{

                const isPasswordCorrect = bcrypt.compareSync(password, newuser.password);
                if (isPasswordCorrect) {

                  const token = jwt.sign({

                    email : newuser.email,
                    firstname : newuser.firstname,
                    lastname : newuser.lastname,
                    role : newuser.role,
                    img : newuser.img
                  },

                    process.env.JWT_SECRET_KEY
                )
                    res.json({
                        message: "Login Successful",
                        token : token,
                        role: newuser.role


                    });
                } else {
                    res.status(401).json({
                        message: "Invalid Password",
                    });
                }
            }
        })
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;  
  }
  if (req.user.role !== "admin") {
    return false;
  }
  return true;
}




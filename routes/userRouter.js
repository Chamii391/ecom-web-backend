import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { useActionState } from "react";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login",loginUser);

export default useActionState
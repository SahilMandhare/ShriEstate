import express from "express";
import { deleteUser, getUserData, test, updateUser } from "../controller/user-controller.js";

const userRoute = express.Router();

userRoute.get("/test", test)
userRoute.post("/update/:id", updateUser)
userRoute.delete("/delete/:id", deleteUser)
userRoute.get("/get/:id", getUserData)

export default userRoute;
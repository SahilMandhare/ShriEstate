import express from "express";
import { getList, listData, listingData, userListData, userListDelete, userListUpdate } from "../controller/list-controller.js";

const route = express.Router()

route.post("/create", listingData)
route.get("/userList/:id", userListData)
route.get("/list/:id", listData)
route.post("/update/:id", userListUpdate)
route.delete("/delete/:id", userListDelete)
route.get("/getList", getList)

export default route
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user-route.js";
import authRoute from "./routes/auth-route.js";
import listRoute from "./routes/list-route.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MongoDB)
  .then(() => console.log("MongoDB Connect"))
  .catch((error) => console.log(error.message));

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Specify the allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include credentials (e.g., cookies) in the CORS request
}));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/lists", listRoute)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(4000, () => console.log("Successfully Port on 4000"));

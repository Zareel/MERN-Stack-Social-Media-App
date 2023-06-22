import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

//importing routes
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/v1/post", postRoute);
app.use("/api/v1/auth", authRoute);

// starting a server
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

export default app;

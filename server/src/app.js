import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

//middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes
app.use("/posts", postRoutes);

// starting a server
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

export default app;

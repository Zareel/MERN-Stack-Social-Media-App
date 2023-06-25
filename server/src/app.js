import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

//importing routes
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// morgan logger (it prints information about our api request and response in console)
app.use(morgan("dev"));

//routes
app.use("/api/v1", postRoute);
app.use("/api/v1/auth", authRoute);

// starting a server
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

export default app;

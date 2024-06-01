import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import apiRouter from "./routes";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const corsOptions = {
  origin: ["http://example.com", "http://localhost:3000"],
};

app.use(cors(corsOptions));
app.disable("x-powered-by");
app.use("/api", apiRouter);

mongoose
  // @ts-ignore
  .connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Datebase");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Midate API" });
});

// Create HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

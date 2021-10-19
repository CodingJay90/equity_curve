import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "./db.js";
import userRoutes from "./routes/userRoute.js";
import tradesRoutes from "./routes/tradesRoutes.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(function (req, res, next) {
  res.user = req.user;
  next();
});

db();

//Import
app.use("/api/v1", userRoutes);
app.use("/api/v1", tradesRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running on port " + port));

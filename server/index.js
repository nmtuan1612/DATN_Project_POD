import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import dalleRoutes from "./routes/dalle.routes.js";
import UserRouter from "./routes/UserRoutes.js";
import connectDB from "./MongoDB/connect.js";
import ShopRouter from "./routes/ShopRoutes.js";
import AuthRouter from "./routes/AuthRoutes.js";
import CategoryRouter from "./routes/CategoryRoutes.js";
import ConversationRouter from "./routes/ConversationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
// app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/shop", ShopRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/conversation", ConversationRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () => console.log("Server has started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();

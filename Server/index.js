const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRouter = require("./Router/authRoute");
const MongoConnect = require("./DataBase/Connection");
const conversationRoute = require("./Router/conversationRoutes");
const userRoute = require("./Router/User");
const cors = require("cors");
const { app, server } = require("./socket/socket");

// const app = express();
dotenv.config();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware
app.use(cookieParser()); // Use cookie-parser before the routes
app.use(express.json()); // Use express.json() before the routes
app.use("/uploads", express.static("uploads")); // use to server image in frontend with url->http://localhost:8000/

// Routes
app.use("/auth", authRouter);
app.use("/", conversationRoute);
app.use("/user", userRoute);
app.use("/user", userRoute)

// MongoDB connection and server start
const startServer = async () => {
  await MongoConnect();
  server.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
  });
};

startServer();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./Routes/user.Route");
const postRouter = require("./Routes/post.Route");
const useragent = require("express-useragent");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(useragent.express());

app.use("/users", userRouter);
app.use("/posts", postRouter);

async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://abhinaba:abhinaba@cluster0.02cwgui.mongodb.net/socialmedia?retryWrites=true&w=majority"
    );
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async (req, res) => {
  try {
    res.end("ok");
  } catch (error) {
    console.log(error);
    res.end("error", error);
  }
});

app.listen(3001, () => {
  connectDb();
  console.log("listening on port 3001");
});

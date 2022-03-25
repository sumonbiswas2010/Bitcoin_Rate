require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/user.router");


app.use(express.json());


app.use ((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE')
  next();
})



app.use("/api", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
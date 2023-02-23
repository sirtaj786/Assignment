const express=require("express")
const cors=require("cors")
const connection=require("./Cofig/db");
const userRoute = require("./Route/user.route");
const { userModel } = require("./Model/user.model");
const bcrypt = require("bcrypt");
let app=express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome");
  });

  app.use("/user",userRoute)

  

app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("Connected to server");
    } catch (err) {
      console.log("Error in while connected", err);
    }
    console.log(`Listen on port ${process.env.PORT}`);
  });
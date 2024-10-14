const express = require('express');
const app = express();

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD} = require("./config/config");
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const PORT = process.env.PORT || 3000;


const mongoose = require("mongoose");
mongoose.connect(
  //"mongodb://root:root@172.18.0.3:27017/?authSource=admin")
  //"mongodb://root:root@mongo:27017/?authSource=admin")
  MONGO_URL)
  .then(() => {
    console.log("Successfully Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error trying to connect mongoDB: ", e);
  });

// to handle JSON
app.use(express.json());


app.get('/', (req, res) => {
  res.send("<h1>Hello world using Express and Docker...!!</h1>");
});

app.get('/login', (req, res) => {
  res.send('This is Login Page');
});

app.get('/signup', (req, res) => {
  res.send('This is Signup Page');
});


app.use("/api/v1/tasks", taskRouter);


app.use("/api/v1/users", userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
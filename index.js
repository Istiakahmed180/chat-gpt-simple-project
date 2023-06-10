const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const Chat = require("./Routers/Chat");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pwqsejd.mongodb.net/TestCluster?retryWrites=true&w=majority`;
console.log(mongoUrl);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successful");
  })
  .catch((error) => console.log(error));

app.use("/chat", Chat);

app.get("/", (req, res) => {
  res.send("ChatGPT Server Is Running");
});

app.listen(port, () => {
  console.log(`ChatGPT Server Is Running On Port:${port}`);
});

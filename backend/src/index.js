require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  /* MUST USE YOUR OWN MONGODB HERE [I used MLAB, it's free for 500mb] */
  "mongodb://...",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(cors());
app.use(express.json());
app.use(require("./routes"));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

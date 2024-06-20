const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let captions = [];

app.post("/api/v1/captions", (req, res) => {
  const { url, captionData } = req.body;
  captions = captionData;
  res.status(200).send({
    message: "captions recieved",
  });
});

app.get("/api/v1/captions", (req, res) => {
  res.status(200).send({ captions });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

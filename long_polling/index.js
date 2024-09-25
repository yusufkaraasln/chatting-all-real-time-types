import express from "express";
import cors from "cors";

const app = express();

app.use(express.text());
app.use(cors());

const pool = [];

app.get("/poll", (req, res) => {
  pool.push(res);
});

app.post("/message", (req, res) => {
  const message = req.body;

  emitMessage(message);

  res.sendStatus(200);
});

function emitMessage(message) {
  for (let res of pool) res.send(message);

  pool.length = 0;
}

app.listen(5000, () => {
  console.log(`I am listening on port 5000!`);
});

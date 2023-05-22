const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { fibonacciHost } = require("./keys");

const app = express();
const fibonacciClient = axios.create({
  baseURL: `http://${fibonacciHost}:4100/`,
});

app.use(cors());
app.use(bodyParser.json());
app.get("/hash-keys", async (_, res) => {
  try {
    const { data: keys } = await fibonacciClient.get("hash-keys");

    res.status(200).send(keys);
  } catch (error) {
    console.log(error);
  }
});
app.get("/hash-values", async (_, res) => {
  try {
    const { data: values } = await fibonacciClient.get("/hash-values");

    res.status(200).send(values);
  } catch (error) {
    console.log(error);
  }
});
app.post("/hash-key", (req, res) => {
  try {
    const key = req.body.key;

    fibonacciClient.post("/hash-key", { key });
    res.status(201).end();
  } catch (error) {
    console.log(error);
  }
});
app.listen(4000, (_) => console.log("listening on port 4000"));

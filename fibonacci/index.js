const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const redis = require("redis");
const { databaseHost, databasePort } = require("./keys");

const app = express();
const client = redis.createClient({ host: databaseHost, port: databasePort });
const hashName = "fibonacciNumbers";

app.use(cors());
app.use(bodyParser.json());
client.on("ready", () => {
  console.log("connected to redis");
  app.get("/hash-keys", async (_, res) => {
    try {
      client.hkeys(hashName, (_, keys) => {
        res.status(200).send(keys);
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/hash-values", async (_, res) => {
    try {
      client.hvals(hashName, (_, values) => {
        res.status(200).send(values);
      });
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/hash-key", async (req, res) => {
    try {
      const { key } = req.body;

      client.hset(hashName, key, fib(parseInt(key)), (_, result) => {
        res.status(201);
      });
    } catch (error) {
      console.log(error);
    }
  });
});
app.listen(4100, () => {
  console.log("listening on port 4100");
});

function fib(key) {
  if (key < 2) return 1;

  const map = new Map([
    [0, 0],
    [1, 1],
  ]);

  for (let n = 2; n <= key; n++) {
    map.set(n, map.get(n - 1) + map.get(n - 2));
  }

  return map.get(key);
}

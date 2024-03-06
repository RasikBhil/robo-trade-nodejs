import express from "express";
import { createRequire } from "module";
import WebSocketV2 from "./src/services/node_socket.js";
const require = createRequire(import.meta.url);
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let server = require("http").createServer();
let WSServer = require("ws").Server;
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger.json");
import instrumentController from "./src/controllers/instruments/index.js";
import favouritesController from "./src/controllers/favourites/index.js";
import defaultFavouritesController from "./src/controllers/defaultFavourites/index.js";
import newsApiController from "./src/controllers/newsApi/index.js";
import { instrumentJob, statusJob } from "./src/services/scheduler.js";

const wss = new WSServer({ server: server });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/instruments", instrumentController);
app.use("/favourites", favouritesController);
app.use("/defaultfavourites", defaultFavouritesController);
app.use("/newsapi", newsApiController);
app.get("/", (req, res) => {
  res.send({ status: 200, message: "working" });
});

server.on("request", app);

wss.on("connection", function (ws, req) {
  console.log("WS", req.url);
  let params = new URL(`http://dummy.com${req.url}`).searchParams;
  let clientCode = params.get("clientCode");
  let feedToken = params.get("feedToken");
  let apiKey = params.get("apiKey");
  console.log("query", clientCode, feedToken, apiKey);

  let angleOneSocket = new WebSocketV2({
    jwttoken: "JWT_TOKEN",
    apikey: apiKey,
    clientcode: clientCode,
    feedtype: feedToken,
  });

  angleOneSocket.customError((evt) => {
    console.log("ERROR", evt);
    ws.send(evt);
  });

  angleOneSocket
    .connect()
    .then((e) => {
      console.log("open", e);
      angleOneSocket.on("tick", receiveTick);
      function receiveTick(data) {
        console.log("receiveTick:::::");
        // setStocks(data);
        if (data !== "pong") {
          ws.send(JSON.stringify(data));
        }
      }
    })
    .catch((err) => {
      console.log("Custom error :", err.message);
      ws.close();
    });

  ws.on("message", (evt) => {
    console.log("json request", JSON.parse(evt));
    angleOneSocket.fetchData(JSON.parse(evt));
  });

  ws.on("error", console.error);

  ws.on("close", function () {
    console.log("stopping client interval");
    if (angleOneSocket.close) {
      angleOneSocket?.close();
    }
  });
});

server.listen(process.env.PORT || 3030, () => {
  console.log(
    "Server listning on port http://localhost:3030/",
    "job is ruunning"
  );
});

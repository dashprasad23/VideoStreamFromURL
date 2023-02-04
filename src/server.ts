import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from 'https';
import videoSteamRoute from "./routes/videosteram.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;
app.use("/api/video", videoSteamRoute.router);

if (process.env.NODE_ENV === "production") {
  //Include your certs for production use
  const credentials = { key: "xxxx", cert: "", ca: "" };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(PORT, () => {
    console.log('App is running on port : ' + PORT);
  });

} else {
  app.listen(PORT, () => {
    console.log(`server started on Port ${PORT}`);
  });
}

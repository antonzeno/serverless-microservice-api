import serverless from "serverless-http";
import express from "express";
import { getDbClient } from "./db/clients";

const app = express();

app.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const sql = await getDbClient();
  const now = Date.now();
  const [dbNowRes] = await sql`select now()`;
  const delta = (dbNowRes.now.getTime() - now);


  return res.status(200).json({
    message: "Hello from root!",
    delta,
  });
});

app.get("/hello", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);

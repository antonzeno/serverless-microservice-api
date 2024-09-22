const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const { neon } = require("@neondatabase/serverless");

const app = express();

const DATABASE_URL_SSM_PARAM = '/serverless-nodejs-api/prod/database-url';
const AWS_REGION = "eu-north-1";
const ssm = new AWS.SSM({ region: AWS_REGION })

async function dbClient() {

  const paramStoreData = await ssm.getParameter({
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  }).promise()

  const sql = neon(paramStoreData.Parameter.Value);
  return sql;
}

app.get("/", async (req, res, next) => {
  const db = await dbClient();
  const results = await db`SELECT NOW()`;


  return res.status(200).json({
    message: "Hello from root!",
    results
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);

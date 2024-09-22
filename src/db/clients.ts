import { neon } from "@neondatabase/serverless";
import * as secrets from "../lib/secrets";

const STAGE = process.env.STAGE || 'prod';
const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${STAGE}/database-url`;
const AWS_REGION = "eu-north-1";

export async function getDbClient() {
    const dbUrl = await secrets.getDatabaseUrl();
    const sql = neon(dbUrl);
    return sql;
}

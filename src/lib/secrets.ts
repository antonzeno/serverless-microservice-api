import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const STAGE = process.env.STAGE || 'prod';
const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${STAGE}/database-url`;
const AWS_REGION = "eu-north-1";

export async function getDatabaseUrl() {
    const client = new SSMClient({ region: AWS_REGION });
    const paramStoreData = ({
        Name: DATABASE_URL_SSM_PARAM,
        WithDecryption: true,
    })
    const command = new GetParameterCommand(paramStoreData);
    const result = await client.send(command);
    return result.Parameter?.Value as string;
}

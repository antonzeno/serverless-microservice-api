import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const STAGE = process.env.STAGE || 'prod';
const AWS_REGION = "eu-north-1";

const PARAMS = {
    DATABASE_URL: `/serverless-nodejs-api/${STAGE}/database-url`,
    SNS_USER_REGISTER_TOPIC_ARN: `/serverless-nodejs-api/${STAGE}/sns/user-register-topic-arn`,
};

const parameterCache: { [key: string]: string } = {};
const client = new SSMClient({ region: AWS_REGION });
async function getParameter(name: string): Promise<string> {
    if (parameterCache[name]) {
        return parameterCache[name];
    }

    const command = new GetParameterCommand({
        Name: name,
        WithDecryption: true,
    });

    const result = await client.send(command);
    const value = result.Parameter?.Value as string;

    parameterCache[name] = value;
    return value;
}

export async function loadSSMConfig() {
    const config = {
        DATABASE_URL: await getParameter(PARAMS.DATABASE_URL),
        SNS_USER_REGISTER_TOPIC_ARN: await getParameter(PARAMS.SNS_USER_REGISTER_TOPIC_ARN),
        //other parameters as needed
    };

    return config;
}

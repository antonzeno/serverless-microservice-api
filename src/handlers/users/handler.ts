import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { AWS_REGION, loadSSMConfig } from '../../lib/ssm-config';
import { v4 as uuidv4 } from 'uuid';

module.exports.register = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = JSON.parse(event.body || '{}');
    const sns = new SNSClient({ region: AWS_REGION });
    const config = await loadSSMConfig();

    const message = {
        data: body,
        event: 'UserRegistered',
    };

    const command = new PublishCommand({
        TopicArn: config.SNS_USER_REGISTER_TOPIC_ARN,
        Message: JSON.stringify(event),
        MessageGroupId: 'userRegistration',
        MessageDeduplicationId: uuidv4(),
    });
    const response = await sns.send(command);

    try {
        const response = await sns.send(command);
        console.log('Message sent successfully:', response.MessageId);
    } catch (error) {
        console.error('Error sending message:', error);
    }

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'User registered successfully', data: body })
    };
};

module.exports.login = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'User logged in successfully' })
    };
};
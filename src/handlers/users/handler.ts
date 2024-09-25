import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

module.exports.register = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = JSON.parse(event.body || '{}');

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
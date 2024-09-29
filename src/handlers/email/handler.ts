import { SNSEvent, SNSHandler, SNSMessage } from 'aws-lambda';

export const send = async (event: SNSEvent) => {
    console.log('Received SNS event:', JSON.stringify(event));

    for (const record of event.Records) {
        const snsMessage: SNSMessage = record.Sns;

        console.log('Parsed Event:', snsMessage);
        console.log('Should send email;');

        // email sending logic here
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Messages processed successfully' })
    };
};

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request method' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};

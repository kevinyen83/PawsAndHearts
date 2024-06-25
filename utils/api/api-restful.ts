import { FormData } from '../../types/form-types';

const awsAPIKey = process.env.AWS_API_KEY as string;
const awsAPIGatewayApplication = process.env
  .AWS_API_GATEWAY_INVOKE_URL_APPLICATION as string;

export async function submitApplication(formData: FormData) {
  const url = awsAPIGatewayApplication;

  if (!awsAPIKey) {
    throw new Error(
      'API key is not defined. Please set AWS_API_KEY in your .env file.'
    );
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': awsAPIKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}

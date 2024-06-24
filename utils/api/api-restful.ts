import { FormData } from '../../types/form-types';

const awsAPIKey = process.env.AWS_API_KEY as string;

const awsAPIGatewayAvalability = process.env
  .AWS_API_GATEWAY_INVOKE_URL_AVALABILITY as string;
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

export async function updatePetAvailability(petId: string): Promise<void> {
  const url = awsAPIGatewayAvalability;

  if (!awsAPIKey) {
    throw new Error(
      'API key is not defined. Please set AWS_API_KEY in your .env file.'
    );
  }

  try {
    if (!petId) {
      throw new Error('No petId provided');
    }

    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': awsAPIKey,
      },
      body: JSON.stringify({ petId }),
    });

    if (!response.ok) {
      throw new Error('Failed to update pet availability.');
    }

    const data = await response.json();
    console.log('Pet availability updated successfully:', data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

import { PetProfileData } from '../../types/petProfile-types';

const awsAPIKey = process.env.AWS_API_KEY as string;

export async function uploadPetByGraphql(petProfileData: PetProfileData) {
  const url =
    'https://b6cragoxk9.execute-api.ap-southeast-2.amazonaws.com/Prod/pet';

  const query = `
    mutation CreatePet($petProfileData: PetInput!) {
        createPetProfile(petProfileData: $petProfileData) {
        pet {
          petId
          organizationName
          applicantName
          contactEmail
          contactPhone
          name
          category
          age
          color
          gender
          size
          location
          vaccination
          availability
          image
          description
        }
      }
    }
  `;

  const variables = { petProfileData };

  if (!awsAPIKey) {
    throw new Error(
      'API key is not defined. Please set AWS_API_KEY in your .env file.'
    );
  }

  const requestBody = {
    body: {
      query,
      variables,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': awsAPIKey,
      },
      body: JSON.stringify(requestBody),
    });

    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    if (!response.ok) {
      console.error(
        'Upload failed:',
        response.status,
        response.statusText,
        responseBody
      );
      throw new Error('Failed to upload pet data');
    }

    const data =
      responseBody.data ||
      (responseBody.body && JSON.parse(responseBody.body).data);

    if (!data) {
      throw new Error('Response data is undefined');
    }

    if (data.errors) {
      throw new Error('Failed to upload pet data: ' + data.errors[0].message);
    }

    if (!data.createPetProfile) {
      throw new Error('createPetProfile not defined in response');
    }

    return data.createPetProfile.pet;
  } catch (error) {
    console.error('Error uploading pet data:', error);
    throw error;
  }
}

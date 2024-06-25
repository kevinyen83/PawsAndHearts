import { PetProfileData } from '../../types/petProfile-types';

const awsAPIKey = process.env.AWS_API_KEY as string;
const awsAPIGatewayPet = process.env.AWS_API_GATEWAY_INVOKE_URL_PET as string;

export async function fetchPets() {
  const url = awsAPIGatewayPet;

  const query = `query GetPets {
    pets {
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
  }`;

  const variables = {};

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response text:', errorText);
      throw new Error(`Failed to fetch pets: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const parsedBody = JSON.parse(result.body);
    return parsedBody.data.pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
}

export async function uploadPetByGraphql(petProfileData: PetProfileData) {
  const url = awsAPIGatewayPet;

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

    console.log(data);

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

export async function updatePetAvailability(petId: string): Promise<void> {
  const url = awsAPIGatewayPet;

  const query = `
      mutation UpdateAvailability($input: UpdateAvailabilityInput!) {
        updateAvailability(input: $input) {
          pet {
            petId
            availability
          }
        }
      }
    `;

  const variables = { input: { petId } };

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
        'Update failed:',
        response.status,
        response.statusText,
        responseBody
      );
      throw new Error('Failed to update pet availability');
    }

    const data =
      responseBody.data ||
      (responseBody.body && JSON.parse(responseBody.body).data);

    if (!data) {
      throw new Error('Response data is undefined');
    }

    if (data.errors) {
      throw new Error(
        'Failed to update pet availability: ' + data.errors[0].message
      );
    }

    console.log(
      'Pet availability updated successfully:',
      data.updateAvailability.pet
    );
  } catch (error) {
    console.error('Error updating pet availability:', error);
    throw error;
  }
}

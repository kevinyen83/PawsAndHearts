export async function fetchPets() {
    try {
        const response = await fetch('https://8lpzuux0q6.execute-api.ap-southeast-2.amazonaws.com/prod/pets');
        if (!response.ok) {
            throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        return data.pets;
    } catch (error) {
        console.error('Error fetching pets:', error);
        throw error;
    }
}

interface FormData {
    fullName: string;
    age: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    applicationId: string;
    petId: string; 
    petName: string;
  }

export async function submitApplication(formData: FormData) {
    const url = 'https://owqzy4n6cj.execute-api.ap-southeast-2.amazonaws.com/prod/application';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    try {
      if (!petId) {
        throw new Error('No petId provided');
      }
  
      const response = await fetch('https://8lpzuux0q6.execute-api.ap-southeast-2.amazonaws.com/prod/updateAvailability', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
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
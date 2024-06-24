import { Pet } from './pet-types';

export interface FormPopupProps {
  pets: Pet[];
  formSelectedPet: Pet | null;
  toggleFormPopup: (pet: Pet) => void;
}

export interface FormState {
  inputUserEmail: string;
}

export interface FormData {
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

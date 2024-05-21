import { Pet } from './pet-types';

export interface FormPopupProps {
  pets: Pet[];
  formSelectedPet: Pet | null;
  toggleFormPopup: (pet: Pet) => void;
}

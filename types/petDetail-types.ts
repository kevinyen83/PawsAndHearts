import { Pet } from './pet-types';

export interface PetDetailPopupProps {
  formSelectedPet: Pet | null;
  selectedPet: Pet;
  onClose: () => void;
  onReserve: () => void;
  toggleFormPopup: (pet: Pet) => void;
  toggleMapPopup: (selectedPet: Pet) => void;
}

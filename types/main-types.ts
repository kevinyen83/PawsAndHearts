import { Pet } from './pet-types';

export interface MainProps {
  toggleCardDetailPopup: (pet: Pet) => void;
  toggleMapPopup: (pet: Pet) => void;
  addToFavorites: (pet: Pet) => void;
  toggleFormPopup: (pet: Pet) => void;
}

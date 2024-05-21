import { Pet } from './pet-types';

export interface FavoritesState {
  favoritesItems: Pet[] | [];
  isFavoritesEmpty: boolean;
  lastId: number;
}

export interface FavoritesProps {
  favoritesItems: any[];
  selectedPet: Pet | null;
  removeItem: (pet: any) => void;
  toggleCardDetailPopup: (pet: any) => void;
}

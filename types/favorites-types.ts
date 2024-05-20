import { Pet } from './pet-types';

export interface FavoritesItemsState {
  favoritesItems: Pet[] | [];
}

export interface IsFavoritesEmptyState {
  isFavoritesEmpty: boolean;
}

export interface LastIdState {
  lastId: number;
}

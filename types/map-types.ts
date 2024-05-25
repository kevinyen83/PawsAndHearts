import { Pet } from './pet-types';

export interface MapProps {
  mapLocation: string;
  onClose: () => void;
  toggleMapPopup: (pet: Pet) => void;
}
export interface MapState {
  mapLocation: string;
}

export interface Coordinates {
  lng: number;
  lat: number;
}

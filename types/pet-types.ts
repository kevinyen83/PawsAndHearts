export interface Pet {
  petId: string;
  name: string;
  category: string;
  age: string;
  gender: string;
  color: string;
  size: string;
  location: string;
  vaccination: string;
  availability: string;
  description: string;
  image: string;
}
export interface PetItemProps {
  pet: Pet;
  toggleCardDetailPopup: (pet: Pet) => void;
  addToFavorites: (pet: Pet) => void;
  toggleFormPopup: (pet: Pet) => void;
}

export interface FavoritesProps {
  favoritesItems: any[];
  selectedPet: Pet | null;
  removeItem: (pet: any) => void;
  toggleCardDetailPopup: (pet: any) => void;
}

export interface FormPopupProps {
  pets: Pet[];
  formSelectedPet: Pet | null;
  toggleFormPopup: (pet: Pet) => void;
}

export interface PetsState {
  pets: Pet[] | [];
}

export interface SelectedPetState {
  selectedPet: Pet | null;
}

export interface FormSelectedPetState {
  formSelectedPet: Pet | null;
}

export interface VisiblePetsState {
  visiblePets: number;
}

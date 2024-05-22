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

export interface PetsState {
  pets: Pet[] | [];
  formSelectedPet: Pet | null;
  selectedPet: Pet | null;
  visiblePets: number;
}

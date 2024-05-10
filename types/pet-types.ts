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

interface FavoritesProps {
  showFavorites: boolean;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  favoritesItems: any[];
  selectedPet: Pet | null;
  setIsFavoritesEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  removeItem: (pet: any) => void;
  toggleCardDetailPopup: (pet: any) => void;
}

export interface FormPopupProps {
  pets: Pet[];
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formSelectedPet: Pet | null;
}

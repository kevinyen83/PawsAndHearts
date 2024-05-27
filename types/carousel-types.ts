export interface PetHighlight {
  id: number;
  name: string;
  category: string;
  age: number;
  gender: string;
  color: string;
  size: string;
  location: string;
  vaccination: string;
  availability: string;
  description: string;
  image: string;
}

export interface CarouselState {
  petHighlight: PetHighlight[];
  startIndex: number;
}

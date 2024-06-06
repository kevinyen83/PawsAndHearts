import { createStructuredSelector, createSelector } from 'reselect';

export const combinedSelector = createStructuredSelector({
  pets: createSelector((state) => state, (state) => state.pets.pets),
  selectedPet: createSelector(
    (state) => state,
    (state) => state.pets.selectedPet
  ),
  formSelectedPet: createSelector(
    (state) => state,
    (state) => state.pets.formSelectedPet
  ),
  visiblePets: createSelector(
    (state) => state,
    (state) => state.pets.visiblePets
  ),
  category: createSelector(
    (state) => state,
    (state) => state.category.category
  ),
  isLoading: createSelector(
    (state) => state,
    (state) => state.isLoading.isLoading
  ),
  showFavorites: createSelector(
    (state) => state,
    (state) => state.showFavorites.showFavorites
  ),
  showForm: createSelector(
    (state) => state,
    (state) => state.showForm.showForm
  ),
  showPetDetail: createSelector(
    (state) => state,
    (state) => state.showPetDetail.showPetDetail
  ),
  showMap: createSelector((state) => state, (state) => state.showMap.showMap),
  favoritesItems: createSelector(
    (state) => state,
    (state) => state.favoritesItems.favoritesItems
  ),
  isFavoritesEmpty: createSelector(
    (state) => state,
    (state) => state.isFavoritesEmpty.isFavoritesEmpty
  ),
  lastId: createSelector((state) => state, (state) => state.lastId.lastId),
  mapLocation: createSelector(
    (state) => state,
    (state) => state.mapLocation.mapLocation
  ),
});

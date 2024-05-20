'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { categoryReducer } from './Feautures/category/category-slice';
import { petsReducer } from './Feautures/pets/pets-slice';
import { isLoadingReducer } from './Feautures/loading/loading-slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { showFavoritesReducer } from './Feautures/popup/showFavorites-slice';
import { showFormReducer } from './Feautures/popup/showForm-slice';
import { showPetDetailReducer } from './Feautures/popup/showPetDetail-slice';
import { selectedPetReducer } from './Feautures/pets/selectedPet-slice';
import { formSelectedPetReducer } from './Feautures/pets/formSelectedPet-slice';
import { favoritesItemsReducer } from './Feautures/favorites/favoritesItems-slice';
import { isFavoritesEmptyReducer } from './Feautures/favorites/isFavoritesEmpty-slice';
import { lastIdReducer } from './Feautures/favorites/lastId-slice';
import { visiblePetsReducer } from './Feautures/pets/visiblePets-slice';
import { pricesReducer } from './Feautures/prices/prices-slice';

const categoryPersistConfig = {
  key: 'category',
  storage: storage,
  whitelist: ['categoryState'],
};

const petsPersistConfig = {
  key: 'pets',
  storage: storage,
  whitelist: ['petsState'],
};

const isLoadingPersistConfig = {
  key: 'isLoading',
  storage: storage,
  whitelist: ['loadingState'],
};

const showFavoritesPersistConfig = {
  key: 'showFavorites',
  storage: storage,
  whitelist: ['showFavoritesState'],
};

const showFormPersistConfig = {
  key: 'showForm',
  storage: storage,
  whitelist: ['showFormState'],
};

const showPetDetailPersistConfig = {
  key: 'showPetDetail',
  storage: storage,
  whitelist: ['showPetDetailState'],
};

const selectedPetPersistConfig = {
  key: 'selectedPet',
  storage: storage,
  whitelist: ['selectedPetState'],
};

const favoritesItemsPersistConfig = {
  key: 'favoritesItems',
  storage: storage,
  whitelist: ['favoritesItemsState'],
};

const isFavoritesEmptyPersistConfig = {
  key: 'isFavoritesEmpty',
  storage: storage,
  whitelist: ['isFavoritesEmptyState'],
};

const lastIdPersistConfig = {
  key: 'lastId',
  storage: storage,
  whitelist: ['lastIdState'],
};

const visiblePetsPersistConfig = {
  key: 'visiblePets',
  storage: storage,
  whitelist: ['visiblePetsState'],
};

const formSelectedPetPersistConfig = {
  key: 'formSelectedPet',
  storage: storage,
  whitelist: ['formSelectedPetState'],
};
const pricesPersistConfig = {
  key: 'prices',
  storage: storage,
  whitelist: ['prices'],
};

const rootReducer = combineReducers({
  category: persistReducer(categoryPersistConfig, categoryReducer),
  pets: persistReducer(petsPersistConfig, petsReducer),
  isLoading: persistReducer(isLoadingPersistConfig, isLoadingReducer),
  showFavorites: persistReducer(
    showFavoritesPersistConfig,
    showFavoritesReducer
  ),
  showForm: persistReducer(showFormPersistConfig, showFormReducer),
  showPetDetail: persistReducer(
    showPetDetailPersistConfig,
    showPetDetailReducer
  ),
  selectedPet: persistReducer(selectedPetPersistConfig, selectedPetReducer),
  formSelectedPet: persistReducer(
    formSelectedPetPersistConfig,
    formSelectedPetReducer
  ),
  favoritesItems: persistReducer(
    favoritesItemsPersistConfig,
    favoritesItemsReducer
  ),
  isFavoritesEmpty: persistReducer(
    isFavoritesEmptyPersistConfig,
    isFavoritesEmptyReducer
  ),
  lastId: persistReducer(lastIdPersistConfig, lastIdReducer),
  visiblePets: persistReducer(visiblePetsPersistConfig, visiblePetsReducer),
  prices: persistReducer(pricesPersistConfig, pricesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

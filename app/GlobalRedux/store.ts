'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { categoryReducer } from './Feautures/category-slice';
import { favoritesReducer } from './Feautures/favorites-slice';
import { loadingReducer } from './Feautures/loading-slice';
import { petsReducer } from './Feautures/pets-slice';
import { popupReducer } from './Feautures/popup-slice';
import { pricesReducer } from './Feautures/prices-slice';

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

const loadingPersistConfig = {
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
  isLoading: persistReducer(loadingPersistConfig, loadingReducer),
  showFavorites: persistReducer(showFavoritesPersistConfig, popupReducer),
  showForm: persistReducer(showFormPersistConfig, popupReducer),
  showPetDetail: persistReducer(showPetDetailPersistConfig, popupReducer),
  selectedPet: persistReducer(selectedPetPersistConfig, petsReducer),
  formSelectedPet: persistReducer(formSelectedPetPersistConfig, petsReducer),
  favoritesItems: persistReducer(favoritesItemsPersistConfig, favoritesReducer),
  isFavoritesEmpty: persistReducer(
    isFavoritesEmptyPersistConfig,
    favoritesReducer
  ),
  lastId: persistReducer(lastIdPersistConfig, favoritesReducer),
  visiblePets: persistReducer(visiblePetsPersistConfig, petsReducer),
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

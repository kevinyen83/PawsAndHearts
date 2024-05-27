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
import { formReducer } from './Feautures/form-slice';
import { navbarReducer } from './Feautures/navbar-slice';
import { carouselReducer } from './Feautures/carousel-slice';
import { mapReducer } from './Feautures/map-slice';

const categoryPersistConfig = {
  key: 'category',
  storage: storage,
  whitelist: ['category'],
};

const petsPersistConfig = {
  key: 'pets',
  storage: storage,
  whitelist: ['pets'],
};

const loadingPersistConfig = {
  key: 'isLoading',
  storage: storage,
  whitelist: ['isLoading'],
};

const showFavoritesPersistConfig = {
  key: 'showFavorites',
  storage: storage,
  whitelist: ['showFavorites'],
};

const showFormPersistConfig = {
  key: 'showForm',
  storage: storage,
  whitelist: ['showForm'],
};

const showPetDetailPersistConfig = {
  key: 'showPetDetail',
  storage: storage,
  whitelist: ['showPetDetail'],
};

const showMapPersistConfig = {
  key: 'showMap',
  storage: storage,
  whitelist: ['showMap'],
};

const selectedPetPersistConfig = {
  key: 'selectedPet',
  storage: storage,
  whitelist: ['selectedPet'],
};

const favoritesItemsPersistConfig = {
  key: 'favoritesItems',
  storage: storage,
  whitelist: ['favoritesItems'],
};

const isFavoritesEmptyPersistConfig = {
  key: 'isFavoritesEmpty',
  storage: storage,
  whitelist: ['isFavoritesEmpty'],
};

const lastIdPersistConfig = {
  key: 'lastId',
  storage: storage,
  whitelist: ['lastId'],
};

const visiblePetsPersistConfig = {
  key: 'visiblePets',
  storage: storage,
  whitelist: ['visiblePets'],
};

const formSelectedPetPersistConfig = {
  key: 'formSelectedPet',
  storage: storage,
  whitelist: ['formSelectedPet'],
};
const pricesPersistConfig = {
  key: 'prices',
  storage: storage,
  whitelist: ['prices'],
};

const inputUserEmailPersistConfig = {
  key: 'inputUserEmail',
  storage: storage,
  whitelist: ['inputUserEmail'],
};

const userEmailPersistConfig = {
  key: 'userEmail',
  storage: storage,
  whitelist: ['userEmail'],
};

const showDropdownPersistConfig = {
  key: 'showDropdown',
  storage: storage,
  whitelist: ['showDropdown'],
};

const petHighlightPersistConfig = {
  key: 'petHighlight',
  storage: storage,
  whitelist: ['petHighlight'],
};

const startIndexPersistConfig = {
  key: 'startIndex',
  storage: storage,
  whitelist: ['startIndex'],
};

const mapLocationPersistConfig = {
  key: 'mapLocation',
  storage: storage,
  whitelist: ['mapLocation'],
};

const coordinatesPersistConfig = {
  key: 'coordinates',
  storage: storage,
  whitelist: ['coordinates'],
};

const rootReducer = combineReducers({
  category: persistReducer(categoryPersistConfig, categoryReducer),
  pets: persistReducer(petsPersistConfig, petsReducer),
  isLoading: persistReducer(loadingPersistConfig, loadingReducer),
  showFavorites: persistReducer(showFavoritesPersistConfig, popupReducer),
  showForm: persistReducer(showFormPersistConfig, popupReducer),
  showPetDetail: persistReducer(showPetDetailPersistConfig, popupReducer),
  showMap: persistReducer(showMapPersistConfig, popupReducer),
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
  inputUserEmail: persistReducer(inputUserEmailPersistConfig, formReducer),
  userEmail: persistReducer(userEmailPersistConfig, navbarReducer),
  showDropdown: persistReducer(showDropdownPersistConfig, navbarReducer),
  petHighlight: persistReducer(petHighlightPersistConfig, carouselReducer),
  startIndex: persistReducer(startIndexPersistConfig, carouselReducer),
  mapLocation: persistReducer(mapLocationPersistConfig, mapReducer),
  coordinates: persistReducer(coordinatesPersistConfig, mapReducer),
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

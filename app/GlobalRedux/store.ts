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

const categoryPersistConfig = {
  key: 'category',
  storage: storage,
  whitelist: ['categoryState'],
};

const petsPersistConfig = {
  key: 'pets',
  storage: storage,
  whitelist: ['petsReducer'],
};

const loadingPersistConfig = {
  key: 'isLoading',
  storage: storage,
  whitelist: ['loadingReducer'],
};

const showFavoritesPersistConfig = {
  key: 'showFavorites',
  storage: storage,
  whitelist: ['popupReducer'],
};

const showFormPersistConfig = {
  key: 'showForm',
  storage: storage,
  whitelist: ['popupReducer'],
};

const showPetDetailPersistConfig = {
  key: 'showPetDetail',
  storage: storage,
  whitelist: ['popupReducer'],
};

const selectedPetPersistConfig = {
  key: 'selectedPet',
  storage: storage,
  whitelist: ['petsReducer'],
};

const favoritesItemsPersistConfig = {
  key: 'favoritesItems',
  storage: storage,
  whitelist: ['favoritesReducer'],
};

const isFavoritesEmptyPersistConfig = {
  key: 'isFavoritesEmpty',
  storage: storage,
  whitelist: ['favoritesReducer'],
};

const lastIdPersistConfig = {
  key: 'lastId',
  storage: storage,
  whitelist: ['favoritesReducer'],
};

const visiblePetsPersistConfig = {
  key: 'visiblePets',
  storage: storage,
  whitelist: ['petsReducer'],
};

const formSelectedPetPersistConfig = {
  key: 'formSelectedPet',
  storage: storage,
  whitelist: ['petsReducer'],
};
const pricesPersistConfig = {
  key: 'prices',
  storage: storage,
  whitelist: ['pricesReducer'],
};

const inputUserEmailPersistConfig = {
  key: 'inputUserEmail',
  storage: storage,
  whitelist: ['formReducer'],
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
  inputUserEmail: persistReducer(inputUserEmailPersistConfig, formReducer),
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

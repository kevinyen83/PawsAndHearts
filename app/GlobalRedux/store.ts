'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { categoryReducer } from './Feautures/category/category-slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const categoryPersistConfig = {
  key: 'category',
  storage: storage,
  whitelist: ['categoryState'],
};

const rootReducer = combineReducers({
  category: persistReducer(categoryPersistConfig, categoryReducer),
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

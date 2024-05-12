import { ReactNode } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';

export interface ReduxProviderProps {
  children: ReactNode;
  store: EnhancedStore;
}

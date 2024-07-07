import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import generalReducer from './general';
import searchReducer from '../components/search/store';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    search: searchReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {general: GeneralState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
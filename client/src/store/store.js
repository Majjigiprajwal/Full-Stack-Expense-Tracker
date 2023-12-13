import { configureStore } from '@reduxjs/toolkit';
import {reducer} from '../slices/transactionSlice';

const store = configureStore({
  reducer: {
    transactions: reducer,
  },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState:{
    transactions:[],
    income : 0,
    expense : 0,
    balance : 0,
  },
  reducers: {
     
    setTransactionData : (state,action)=> {

    }

},
});

export const { actions, reducer } = transactionSlice;

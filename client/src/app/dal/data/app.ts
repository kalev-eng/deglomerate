import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../app/store';

import * as api from '../api';

// types
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

interface StringState {
    value: string;
  };
  
const initialStringState: StringState = {
    value: '',
  };

interface Web3State {
  value: Web3 | null;
};

const initialWeb3State: Web3State | null = {
  value: null,
};

interface ContractState {
  value: Contract | null;
};

const initialContractState: ContractState | null = {
  value: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialStringState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    
  },
});

export const web3Slice = createSlice({
name: 'web3',
initialState: initialWeb3State,
reducers: {
  setWeb3: (state, action: PayloadAction<Web3>) => {
    state.value = action.payload;
  },
  
},
});

export const logoContractSlice = createSlice({
  name: 'logoContract',
  initialState: initialContractState,
  reducers: {
    setLogoContract: (state, action: PayloadAction<Contract>) => {
      state.value = action.payload;
    },
    
  },
});

export const logoDescriptorContractSlice = createSlice({
  name: 'logoDescriptorContract',
  initialState: initialContractState,
  reducers: {
    setLogoDescriptorContract: (state, action: PayloadAction<Contract>) => {
      state.value = action.payload;
    },
    
  },
});

export const backgroundContractSlice = createSlice({
  name: 'backgroundContract',
  initialState: initialContractState,
  reducers: {
    setBackgroundContract: (state, action: PayloadAction<Contract>) => {
      state.value = action.payload;
    },
    
  },
});

export const foregroundContractSlice = createSlice({
  name: 'foregroundContract',
  initialState: initialContractState,
  reducers: {
    setForegroundContract: (state, action: PayloadAction<Contract>) => {
      state.value = action.payload;
    },
    
  },
});

export const textContractSlice = createSlice({
  name: 'textContract',
  initialState: initialContractState,
  reducers: {
    setTextContract: (state, action: PayloadAction<Contract>) => {
      state.value = action.payload;
    },
    
  },
});

export const searchContractSlice = createSlice({
  name: 'searchContract',
  initialState: initialContractState,
  reducers: {
    setSearchContract: (state, action: PayloadAction<Contract>) => {
      state.value = action.payload;
    },
    
  },
});

/*
export const loadSomething = (): AppThunk => dispatch => {
    return api.getSomething({}).then((response: any) => {
        dispatch(setSomething(response));
    });
};
*/
  
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// select
export const selectAccount = (state: RootState) => state.account.value;
export const selectWeb3 = (state: RootState) => state.web3.value;
export const selectLogoContract = (state: RootState) => state.logoContract.value;
export const selectLogoDescriptorContract = (state: RootState) => state.logoDescriptorContract.value;
export const selectBackgroundContract = (state: RootState) => state.backgroundContract.value;
export const selectForegroundContract = (state: RootState) => state.foregroundContract.value;
export const selectTextContract = (state: RootState) => state.textContract.value;
export const selectSearchContract = (state: RootState) => state.searchContract.value;

// reducer
const accountReducer = accountSlice.reducer;
const web3Reducer = web3Slice.reducer;
const logoContractReducer = logoContractSlice.reducer;
const logoDescriptorContractReducer = logoDescriptorContractSlice.reducer;
const backgroundContractReducer = backgroundContractSlice.reducer;
const foregroundContractReducer = foregroundContractSlice.reducer;
const textContractReducer = textContractSlice.reducer;
const searchContractReducer = searchContractSlice.reducer;

export { accountReducer, web3Reducer };
export { logoContractReducer, logoDescriptorContractReducer, backgroundContractReducer, foregroundContractReducer, textContractReducer, searchContractReducer};

// set
export const { setAccount } = accountSlice.actions
export const { setWeb3 } = web3Slice.actions
export const { setLogoContract } = logoContractSlice.actions
export const { setLogoDescriptorContract } = logoDescriptorContractSlice.actions
export const { setBackgroundContract } = backgroundContractSlice.actions
export const { setForegroundContract } = foregroundContractSlice.actions
export const { setTextContract } = textContractSlice.actions
export const { setSearchContract } = searchContractSlice.actions
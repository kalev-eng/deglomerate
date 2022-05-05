import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { accountReducer, web3Reducer, logoContractReducer, logoDescriptorContractReducer,
          backgroundContractReducer, foregroundContractReducer, 
          textContractReducer, searchContractReducer} from './dal/data/app';


export const store = configureStore({
  reducer: {
    account: accountReducer,
    web3: web3Reducer,
    logoContract: logoContractReducer,
    logoDescriptorContract: logoDescriptorContractReducer,
    backgroundContract: backgroundContractReducer,
    foregroundContract: foregroundContractReducer,
    textContract: textContractReducer,
    searchContract: searchContractReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

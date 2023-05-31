import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productListSlice from './reducers/productListSlice';
import productDetailsSlice from './reducers/productDetailsSlice';
import cartSlice from './reducers/cartSlice';
import userSlice from './reducers/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartItems'],
};

const rootReducer = combineReducers({
  productList: productListSlice,
  productDetails: productDetailsSlice,
  cartItems: cartSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

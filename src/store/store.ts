import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store:any = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;


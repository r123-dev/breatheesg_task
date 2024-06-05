import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  uid: string,
  email: string,
  token: string,
  name: string
}


const initialState: User = {
  uid: "",
  email: "",
  token: "",
  name: ""
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string, email: string, token: string, name: string }>) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.uid = action.payload.uid;
    }
  }
});

export const { setUser } = user.actions;
export default user.reducer;

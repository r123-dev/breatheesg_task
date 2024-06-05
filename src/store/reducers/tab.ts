import { createSlice } from '@reduxjs/toolkit';

const initialState: {tab: boolean} = {
    tab: false
};

const tab = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        toggleTab: (state) => {
            state.tab = !state.tab
        },
    }
});

export const { toggleTab } = tab.actions;
export default tab.reducer;

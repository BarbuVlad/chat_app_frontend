import { createSlice } from "@reduxjs/toolkit";

/*Slice for managing the selected user from the list of contacts (home page) */

const selectedSlice = createSlice({
    name:'selected',
    initialState: '',
    reducers: {
        setSelected: (state, action) => {return action.payload},
       // unsetSelected: (state) => ''
    }
});

export const {setSelected} = selectedSlice.actions;
export default selectedSlice.reducer;
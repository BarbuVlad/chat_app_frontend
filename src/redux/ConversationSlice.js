import { createSlice } from "@reduxjs/toolkit";

/*Slice for managing the selected user from the list of contacts (home page) */

const conversationSlice = createSlice({
    name:'conversation',
    initialState: [],
    reducers: {
        setConversation: (state, action) => {return action.payload},
        addToConversation: (state, action) => [...state, action.payload]
    }
});

export const {setConversation,addToConversation} = conversationSlice.actions;
export default conversationSlice.reducer;
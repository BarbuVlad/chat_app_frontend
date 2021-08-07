import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import selectedSlice from './SelectedSlice';
import conversationSlice from './ConversationSlice';

const reducer =  combineReducers({
    selected: selectedSlice,
    conversation: conversationSlice
});
const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk:false })]
});

export default store;
import { combineReducers } from '@reduxjs/toolkit';

import activeTextReducer from './activeTextSlice';

const rootReducer = combineReducers({
    activeText: activeTextReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

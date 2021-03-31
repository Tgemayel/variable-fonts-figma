import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COLOR, DEFAULT_CONTENT } from '../consts';
import { IActiveAxes, IColor } from '../types';

interface SelectedText {
    selectedStatus: boolean;
    fontName: string;
    axes: IActiveAxes;
    content: string;
    color: IColor;
}

type CurrentActiveTextState = {} & SelectedText;

let initialState: CurrentActiveTextState = {
    selectedStatus: false,
    fontName: null,
    axes: {},
    color: DEFAULT_COLOR,
    content: DEFAULT_CONTENT,
};

const activeTextSlice = createSlice({
    name: 'activeText',
    initialState,
    reducers: {
        updateActiveFont(state, action: PayloadAction<{ fontName: string; axes: IActiveAxes; color: IColor }>) {
            const { fontName, axes, color } = action.payload;
            state.fontName = fontName;
            state.axes = axes;
            state.color = color;
        },
        updateActiveFontAxes(state, action: PayloadAction<IActiveAxes>) {
            state.axes = action.payload;
        },
        updateActiveFontAxis(state, action: PayloadAction<{ tag: string; value: number }>) {
            const { tag, value } = action.payload;
            state.axes[tag] = value;
        },
        updateActiveText(state, action: PayloadAction<string>) {
            state.content = action.payload;
        },
        updateSelectionStatus(state, action: PayloadAction<boolean>) {
            state.selectedStatus = action.payload;
        },
        updateActiveColor(state, action: PayloadAction<IColor>) {
            state.color = action.payload;
        },
    },
});

export const {
    updateActiveText,
    updateActiveFont,
    updateActiveFontAxes,
    updateActiveFontAxis,
    updateSelectionStatus,
    updateActiveColor,
} = activeTextSlice.actions;

export default activeTextSlice.reducer;

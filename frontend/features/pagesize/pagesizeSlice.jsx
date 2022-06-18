import { createSlice } from "@reduxjs/toolkit";

const pagesizeSlice = createSlice({
	name: "pageSize",
	initialState: {
		height: null,
		width: null,
	},
	reducers: {
		updateSize: (state, action) => {
			state.height = action.payload.height;
			state.width = action.payload.width;
		},
	},
});

export const { updateSize } = pagesizeSlice.actions;
export default pagesizeSlice.reducer;

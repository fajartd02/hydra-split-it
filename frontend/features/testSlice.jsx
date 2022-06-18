import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
	name: "name",
	initialState: {
		name: "Fabian Habil",
	},
	reducers: {
		getData: (state, action) => {
			state.name = action.payload.name;
		},
	},
});

export const { getData } = testSlice.actions;
export default testSlice.reducer;

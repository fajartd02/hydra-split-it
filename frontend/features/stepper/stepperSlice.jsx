import { createSlice } from "@reduxjs/toolkit";

const stepperSlice = createSlice({
	name: "pageSize",
	initialState: {
		stepper: 0,
	},
	reducers: {
		updateStepper: (state, action) => {
			state.stepper = action.payload.stepper;
		},
	},
});

export const { updateStepper } = stepperSlice.actions;
export default stepperSlice.reducer;

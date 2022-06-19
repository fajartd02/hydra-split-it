import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {
		id: "",
		name: "",
	},
	loggedIn: false,
};

const userSlice = createSlice({
	name: "pageSize",
	initialState,
	reducers: {
		setLoggedIn: (state) => {
			state.loggedIn = true;
		},
	},
});

export const { setLoggedIn } = userSlice.actions;
export default userSlice.reducer;

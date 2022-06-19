import { configureStore } from "@reduxjs/toolkit";
import pagesizeReducer from "../features/pagesize/pagesizeSlice";
import groupReducer from "../features/group/groupSlice";
import stepperReducer from "../features/stepper/stepperSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
	reducer: {
		pagesize: pagesizeReducer,
		group: groupReducer,
		stepperGroup: stepperReducer,
		user: userReducer,
	},
});

export default store;

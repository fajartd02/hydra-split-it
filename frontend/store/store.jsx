import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../features/testSlice";
import pagesizeReducer from "../features/pagesize/pagesizeSlice";

const store = configureStore({
	reducer: {
		test: testReducer,
		pagesize: pagesizeReducer,
	},
});

export default store;

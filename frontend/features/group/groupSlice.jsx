import { createSlice } from "@reduxjs/toolkit";
import groupData from "../../components/templates/group/data";

const initialState = groupData;

const groupSlice = createSlice({
	name: "group",
	initialState,
	reducers: {},
});

export const { updateSize } = groupSlice.actions;
export default groupSlice.reducer;

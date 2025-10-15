import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Slice/taskManageSlice";
export const store = configureStore({
	reducer: {
		taskReducer: taskReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

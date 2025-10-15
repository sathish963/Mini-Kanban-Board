import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskType } from "../../pages/Board/interface";

export interface TaskManageState {
	tasks: Array<TaskType>;
}

const initialState: TaskManageState = {
	tasks: [],
};

export const TaskManageSlice = createSlice({
	name: "task-manage",
	initialState,
	reducers: {
		insertTask: (state, actions: PayloadAction<TaskType>) => {
			state.tasks.push(actions.payload);
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		retriveFromLocal: (state) => {
			state.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
		},
		updateTask: (
			state,
			action: PayloadAction<{ index: number; task: TaskType }>
		) => {
			state.tasks[action.payload.index] = action.payload.task;
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		deleteTask: (state, action: PayloadAction<number | string>) => {
			state.tasks = state.tasks.filter(
				(task: TaskType) => task.id !== action.payload
			);
		},
	},
});

export const { insertTask, retriveFromLocal, updateTask, deleteTask } =
	TaskManageSlice.actions;

export default TaskManageSlice.reducer;

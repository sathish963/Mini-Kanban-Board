export interface TaskI {
	title: string;
	description: string;
	priority: "LOW" | "MEDIUM" | "HIGH" | "";
	dueDate: string;
}

export interface TaskErrorsI {
	title: string;
	description: string;
	priority: string;
	dueDate: string;
}

export type TaskType = TaskI & { status: string; id: number | string };

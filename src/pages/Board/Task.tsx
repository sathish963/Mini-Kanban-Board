import { format, parseISO } from "date-fns";
import type { TaskType } from "./interface";

interface TaskCardI {
	task: TaskType;
	isDragging: boolean;
	onEdit?(id: number | string): void;
	onDelete?(id: number | string): void;
}

const priorityColor = {
	LOW: "text-yellow-600",
	MEDIUM: "text-orange-500",
	HIGH: "text-red-700",
};

const TaskCard = ({
	task,
	isDragging,
	onEdit = () => {},
	onDelete = () => {},
}: TaskCardI) => {
	return (
		<div
			className={`relative border-1 hover:bg-secondary border-gray-100 p-4 rounded-lg  bg-primary pb-1 flex flex-col gap-2 ${
				isDragging ? "bg-secondary" : ""
			}`}
		>
			<div className="absolute right-2 top-1 flex gap-2">
				<button
					className="px-2 border-1 border-gray-300 rounded-md text-sm font-semibold text-o-primary hover:bg-gray-400 cursor-pointer"
					onClick={() => onEdit(task.id)}
				>
					Edit
				</button>
				<button
					className="px-2 border-1 border-gray-300 rounded-md text-sm font-semibold text-o-primary hover:bg-red-500 cursor-pointer"
					onClick={() => onDelete(task.id)}
				>
					Delete
				</button>
			</div>
			<p className="font-medium text-o-primary text-lg"># {task.title}</p>
			<p className="text-o-primary">{task.description}</p>
			<div className="flex justify-between">
				<p
					className={`${
						priorityColor[task.priority]
					} font-bold text-sm`}
				>
					{task.priority}
				</p>
				<p className="text-o-primary font-medium text-sm">
					{format(parseISO(task.dueDate), "dd MMM, yyyy")}
				</p>
			</div>
		</div>
	);
};

export default TaskCard;

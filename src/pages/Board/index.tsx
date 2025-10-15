import { useEffect, useState } from "react";
import {
	Column,
	Icon,
	Input,
	Modal,
	SelectBox,
	Textarea,
} from "../../Components";
import type { TaskErrorsI, TaskI, TaskType } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteTask,
	insertTask,
	retriveFromLocal,
	updateTask,
} from "../../redux/Slice/taskManageSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { ColumnI } from "../../Components/Column";
import TaskCard from "./Task";

const uniqueKey = () => {
	return Math.floor(Math.random() * Date.now());
};
const INITIAL_TASK: TaskI = {
	title: "",
	description: "",
	priority: "",
	dueDate: "",
};

const validateTask = (
	task: TaskI
): { errors: TaskErrorsI; isValid: boolean } => {
	const errors: TaskErrorsI = INITIAL_TASK;
	let isValid: boolean = true;
	if (!task.title) {
		errors.title = "Please enter task title.";
		isValid = false;
	}
	if (!task.description) {
		errors.description = "Please enter description.";
		isValid = false;
	}
	if (!task.priority) {
		errors.priority = "Please select priority.";
		isValid = false;
	}
	if (!task.dueDate) {
		errors.dueDate = "Select Due date.";
		isValid = false;
	}
	return { errors, isValid };
};

const COLUMN_DEFINATION: Array<ColumnI & { id: string }> = [
	{
		type: "TO-DO",
		header: "To-Do",
		id: "todo",
	},
	{
		type: "PROGRESS",
		header: "Progress",
		id: "progress",
	},
	{
		type: "DONE",
		header: "Done",
		id: "done",
	},
];
const Board = () => {
	const [isTaskModalOpen, setIsTaskModaOpen] = useState<boolean>(false);
	const [filter, setFiter] = useState<string>("");
	const [search, setSearch] = useState("");
	const { tasks } = useSelector((state: any) => state.taskReducer);
	const [errors, setErrors] = useState<TaskErrorsI>({ ...INITIAL_TASK });
	const [task, setTask] = useState<TaskI>({ ...INITIAL_TASK });
	const dispatch = useDispatch();

	const onChangeHandler = ({ target: { name, value } }) => {
		setTask((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const onFilterChangeHandler = (value: string) => {
		if (value === filter) setFiter("");
		else setFiter(value);
	};

	const onEditHandler = (id: number) => {
		setTask({ ...tasks.find((t: any) => t.id === id) });
		setIsTaskModaOpen(true);
	};

	const onDragEndHadler = (dragInfo) => {
		const { destination, draggableId, source } = dragInfo;
		if (!destination) return null;
		if (destination.droppableId === source.droppableId) return null;
		const status = {
			todo: "TO-DO",
			progress: "PROGRESS",
			done: "DONE",
		};
		let taskIndex = 0;
		const task = tasks.find((t: any, i: number) => {
			if (draggableId.includes(t.id + "")) {
				taskIndex = i;
				return true;
			} else return false;
		});

		dispatch(
			updateTask({
				index: taskIndex,
				task: { ...task, status: status[destination.droppableId] },
			})
		);
	};

	useEffect(() => {
		dispatch(retriveFromLocal());
	}, []);

	return (
		<>
			<Modal
				isOpen={isTaskModalOpen}
				title="Create Task"
				onClose={() => setIsTaskModaOpen(false)}
				onSuccess={() => {
					const { errors, isValid } = validateTask(task);
					if (isValid) {
						if (task.id) {
							let taskIndex = 0;
							tasks.find((t: any, i: number) => {
								if (t.id === task.id) {
									taskIndex = i;
									return true;
								} else return false;
							});

							dispatch(
								updateTask({
									index: taskIndex,
									task: {
										...task,
									},
								})
							);
						} else {
							dispatch(
								insertTask({
									...task,
									status: "TO-DO",
									id: uniqueKey(),
								})
							);
						}
						setTask({ ...INITIAL_TASK });
						setIsTaskModaOpen(false);
					} else {
						setErrors(errors);
					}
				}}
			>
				<div className="flex flex-col gap-4 pb-5">
					<Input
						label="Enter Task Title"
						required
						value={task.title}
						onChange={onChangeHandler}
						name="title"
						error={errors.title}
					/>
					<Textarea
						label="Description"
						required
						value={task.description}
						onChange={onChangeHandler}
						name="description"
						error={errors.description}
					/>
					<div className="flex gap-4">
						<div className="w-1/2">
							<SelectBox
								label="Priority"
								required
								name="priority"
								value={task.priority}
								onChange={onChangeHandler}
								error={errors.priority}
								options={[
									{ label: "Low", value: "LOW" },
									{ label: "Medium", value: "MEDIUM" },
									{ label: "High", value: "HIGH" },
								]}
								placeholder="Select priority"
							/>
						</div>
						<div className="grow-1">
							<Input
								label="Due Date"
								required
								type="date"
								value={task.dueDate}
								error={errors.dueDate}
								name="dueDate"
								placeholder="Completion Date"
								onChange={onChangeHandler}
							/>
						</div>
					</div>
				</div>
			</Modal>
			<div className="p-3">
				<div className="flex justify-between items-center">
					<div className="flex gap-3">
						<p className="font-bold text-lg text-o-primary tracking-wide">
							Filter's:
						</p>
						<button
							onClick={() => onFilterChangeHandler("LOW")}
							className={`font-semibold cursor-pointer text-sm px-3 py-1 underline rounded ${
								filter === "LOW"
									? "bg-o-primary text-primary"
									: "bg-primary text-o-primary"
							}`}
						>
							Low
						</button>
						<button
							onClick={() => onFilterChangeHandler("MEDIUM")}
							className={`font-semibold cursor-pointer text-sm px-3 py-1 underline rounded ${
								filter === "MEDIUM"
									? "bg-o-primary text-primary"
									: "bg-primary text-o-primary"
							}`}
						>
							Medium
						</button>
						<button
							onClick={() => onFilterChangeHandler("HIGH")}
							className={`font-semibold cursor-pointer text-sm px-3 py-1 underline rounded ${
								filter === "HIGH"
									? "bg-o-primary text-primary"
									: "bg-primary text-o-primary"
							}`}
						>
							High
						</button>
					</div>
					<div className="flex gap-4">
						<div className="flex items-end gap-2">
							{search ? (
								<button
									onClick={() => setSearch("")}
									className="cursor-pointer text-gray-500"
								>
									clear
								</button>
							) : null}
							<Input
								placeholder="Search"
								value={search}
								onChange={({ target: { value } }) =>
									setSearch(value)
								}
							/>
						</div>
						<button
							className="py-1 px-2 border-2 border-gray-100 rounded-lg cursor-pointer text-o-primary font-medium bg-secondary"
							onClick={() => setIsTaskModaOpen(true)}
						>
							Create Task
						</button>
					</div>
				</div>
			</div>
			<DragDropContext onDragEnd={onDragEndHadler}>
				<div className="grid grid-cols-3 gap-6 p-4 grow-1">
					{COLUMN_DEFINATION.map(({ header, type, id }) => (
						<Column key={type} header={header} type={type}>
							<Droppable droppableId={id} direction={"vertical"}>
								{(provided, snapshot) => (
									<div
										className="p-3 gap-3 h-full"
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{tasks.map(
											(task: TaskType, index: number) => {
												return type === task.status &&
													(filter === ""
														? true
														: task.priority ===
														  filter) &&
													(search === ""
														? true
														: task.title
																.toLocaleLowerCase()
																.includes(
																	search
																		.toLocaleLowerCase()
																		.trim()
																)) ? (
													<Draggable
														key={task.id + ""}
														draggableId={`key_${task.id}`}
														index={index}
														isDragDisabled={false}
													>
														{(
															provided,
															snapshot
														) => (
															<div
																className="bg-primary mb-5"
																ref={
																	provided.innerRef
																}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={
																	provided
																		.draggableProps
																		.style
																}
															>
																<TaskCard
																	onEdit={
																		onEditHandler
																	}
																	onDelete={(
																		id
																	) =>
																		dispatch(
																			deleteTask(
																				id
																			)
																		)
																	}
																	isDragging={
																		snapshot.isDragging
																	}
																	task={task}
																/>
															</div>
														)}
													</Draggable>
												) : null;
											}
										)}
									</div>
								)}
							</Droppable>
						</Column>
					))}
				</div>
			</DragDropContext>
		</>
	);
};

export default Board;

//   <Droppable droppableId="droppable">
//     {(provided, snapshot) => (
//       <div
//         {...provided.droppableProps}
//         ref={provided.innerRef}
//         style={getListStyle(snapshot.isDraggingOver)}
//       >
//         {this.state.items.map((item, index) => (
//           <Draggable key={item.id} draggableId={item.id} index={index}>
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.draggableProps}
//                 {...provided.dragHandleProps}
//                 style={getItemStyle(
//                   snapshot.isDragging,
//                   provided.draggableProps.style
//                 )}
//               >
//                 {item.content}
//               </div>
//             )}
//           </Draggable>
//         ))}
//         {provided.placeholder}
//       </div>
//     )}
//   </Droppable>
// </DragDropContext>

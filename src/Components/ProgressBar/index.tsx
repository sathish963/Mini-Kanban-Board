import { useSelector } from "react-redux";
const getCompletedTaskPercentage = (tasks: any) => {
	let count = 0;
	tasks.forEach((task: any) => (task.status == "DONE" ? count++ : null));
	return Math.floor((count / tasks.length) * 100) + "%";
};
const ProgressBar = () => {
	const { tasks } = useSelector((state: any) => state.taskReducer);

	return (
		<div className="w-full mb-8">
			<div
				className={`h-1 bg-green-400 relative`}
				style={{ width: getCompletedTaskPercentage(tasks) }}
			>
				<p className="p-1 border-1 border-gray-100 absolute right-0 top-3 rounded-lg text-xs font-bold bg-secondary text-o-primary">
					{getCompletedTaskPercentage(tasks)}
				</p>
			</div>
		</div>
	);
};

export default ProgressBar;

import type { ReactNode } from "react";

export type ColumnType = "TO-DO" | "PROGRESS" | "DONE";
export interface ColumnI {
	header: string;
	type: ColumnType;
	children?: ReactNode;
}

const getBgColor = (type: ColumnType) => {
	switch (type) {
		case "TO-DO":
			return "bg-pink";
		case "PROGRESS":
			return "bg-sky-blue";
		case "DONE":
			return "bg-parrot-green";
		default:
			return "bg-primary";
	}
};

const Column = ({ header, type, children }: ColumnI) => {
	return (
		<div className="h-full border-1 border-gray-100 rounded-t-lg overflow-hidden">
			<p className={`${getBgColor(type)} p-3 text-lg font-medium`}>
				{header}
			</p>
			{children}
		</div>
	);
};

export default Column;

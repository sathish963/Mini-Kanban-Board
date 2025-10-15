import type React from "react";

interface InputI {
	label?: string;
	error?: string;
}

type InputType = InputI & React.ComponentPropsWithoutRef<"input">;

const Input = ({ label, required, error, ...restProps }: InputType) => {
	return (
		<div className="flex flex-col gap-1 ">
			{label ? (
				<label className="text-o-primary text-lg">
					{label}{" "}
					{required ? <span className="text-red-600">*</span> : null}
				</label>
			) : null}
			<input
				className="p-2 py-[8px] border-gray-100 border-2 rounded-sm outline-0 focus:border-o-primary text-o-primary"
				required={required}
				{...restProps}
			/>
			{error ? <p className="text-red-700">{error}</p> : null}
		</div>
	);
};

export default Input;

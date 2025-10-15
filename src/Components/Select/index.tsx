import { useState } from "react";
import Icon from "../Icon";

interface SelectBoxI {
	options: Array<string | { label: string; value: string | number }>;
	placeholder?: string;
	label: string;
	name?: string;
	error?: string;
}

type SelectBoxType = SelectBoxI & React.ComponentPropsWithoutRef<"select">;
const SelectBox = ({
	options = [],
	value = "",
	placeholder,
	label,
	error,
	...restProps
}: SelectBoxType) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="relative flex flex-col gap-1">
			<label className="text-o-primary text-lg">{label}</label>
			<div
				className={`flex justify-between items-center p-2 py-2 border-gray-100 border-2 rounded-sm outline-0 text-o-primary cursor-pointer ${
					isOpen ? "focus:border-o-primary" : ""
				}`}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<p>
					{(typeof options[0] === "string"
						? value
						: options.find((option: {}) => option.value === value)
								?.label) || placeholder}
				</p>
				<Icon name="down-arrow" color="var(--color-o-primary)" />
			</div>
			{error ? <p className="text-red-700">{error}</p> : null}
			{isOpen ? (
				<>
					<div
						className="fixed left-0 top-0 w-screen h-screen"
						onClick={() => setIsOpen(false)}
					></div>
					<ul className="absolute w-full border-gray-100 border-1 bg-primary top-20 rounded-sm">
						{options.map((option, index) => {
							if (typeof option === "string")
								return (
									<li
										key={index}
										className="text-o-primary border-b-1 border-gray-100 px-4 py-1 hover:bg-secondary cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											setIsOpen(false);
											restProps.onChange &&
												restProps.onChange({
													target: {
														name: restProps.name,
														value: option,
													},
												});
										}}
									>
										{option}
									</li>
								);
							return (
								<li
									key={index}
									className="text-o-primary border-b-1 border-gray-100 px-4 py-1 hover:bg-secondary cursor-pointer"
									onClick={(e) => {
										e.stopPropagation();
										setIsOpen(false);
										restProps.onChange &&
											restProps.onChange({
												target: {
													name: restProps.name,
													value: option.value,
												},
											});
									}}
								>
									{option.label}
								</li>
							);
						})}
					</ul>
				</>
			) : null}
		</div>
	);
};

export default SelectBox;

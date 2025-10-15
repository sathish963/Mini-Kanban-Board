import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";

const TopNavbar = () => {
	const [islightMode, setIsLightMode] = useState<boolean>(true);
	const isCheckOnMount = useRef<boolean>(false);
	const switchColors = (): void => {
		const currentColor = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue("--color-primary");
		const oppositeColor = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue("--color-o-primary");
		document.documentElement.style.setProperty(
			"--color-primary",
			oppositeColor
		);
		document.documentElement.style.setProperty(
			"--color-o-primary",
			currentColor
		);
	};
	const onThemeChangeHandlre = () => {
		switchColors();
		setIsLightMode((prev) => !prev);
		localStorage.setItem("theme", islightMode ? "dark" : "light");
	};

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (theme === "dark" && isCheckOnMount.current === false) {
			isCheckOnMount.current = true;
			switchColors();
			setIsLightMode(false);
		}
	}, []);
	return (
		<div className="flex bg-primary justify-between items-center p-5 border-b-1 border-gray-100 ">
			<h1 className="text-3xl font-semibold text-o-primary">Kanban</h1>
			<div
				className="flex gap-4 items-center border-gray-100 border-1 p-1 rounded-full relative cursor-pointer"
				onClick={onThemeChangeHandlre}
			>
				<div
					className="w-[24px] h-[24px] bg-o-primary rounded-full absolute z-10 transition-all duration-200 ease-linear"
					style={{ left: islightMode ? "4px" : "37px" }}
				></div>
				<div className="z-100">
					<Icon
						name="sun"
						className={"transition-all duration-300 ease-linear"}
						color={"white"}
					/>
				</div>
				<div className="z-100">
					<Icon
						name="moon"
						size={19}
						className={"transition-all duration-300 ease-linear"}
						color={"black"}
					/>
				</div>
			</div>
		</div>
	);
};

export default TopNavbar;

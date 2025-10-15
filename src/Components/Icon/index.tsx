interface IconI {
	name: string;
	size?: number;
	color?: string;
	className?: string;
}

const Icon = ({ name, size = 24, color = "black", className = "" }: IconI) => {
	switch (name) {
		case "moon":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
				>
					<path
						fill={color}
						className={className}
						d="M12.1 22q-2.1 0-3.937-.8t-3.2-2.162t-2.163-3.2T2 11.9q0-3.65 2.325-6.437T10.25 2q-.45 2.475.275 4.838t2.5 4.137t4.138 2.5T22 13.75q-.65 3.6-3.45 5.925T12.1 22"
					/>
				</svg>
			);
		case "sun":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
				>
					<path
						fill={color}
						className={className}
						d="M12 16.5A4.505 4.505 0 0 1 7.5 12c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5s-2.019 4.5-4.5 4.5"
					/>
					<path
						fill={color}
						className={className}
						fill-rule="evenodd"
						d="M12 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 12 3m6 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M3 12a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 3 12m9 6a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5m6.354-12.354a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0m-10.5 10.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0m-2.208-10.5a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 1 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708m10.5 10.5a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708"
						clip-rule="evenodd"
					/>
				</svg>
			);
		case "close":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
				>
					<path
						fill={color}
						d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
					/>
				</svg>
			);

		case "down-arrow":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
				>
					<path
						fill="none"
						stroke={color}
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="m7 10l5 5l5-5"
					/>
				</svg>
			);
		default:
			return (
				<>
					<span>?</span>
				</>
			);
	}
};

export default Icon;

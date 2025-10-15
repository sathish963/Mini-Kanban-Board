import type { ReactNode } from "react";
import Icon from "../Icon";

interface ModalI {
	isOpen: boolean;
	title: string;
	onClose?(): void;
	onSuccess?(): void;
	children: ReactNode;
}
const Modal = ({
	isOpen,
	onClose = () => {},
	title,
	onSuccess = () => {},
	children,
}: ModalI) => {
	return isOpen ? (
		<div
			className="fixed left-0 top-0 z-1000 h-screen w-screen backdrop-blur-xs flex justify-center items-start"
			onClick={onClose}
		>
			<div
				className="bg-primary mt-25 rounded-lg min-w-1/2 max-w-3/4 border-gray-100 border-1"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="flex p-5 items-center justify-between bg-secondary border-gray-100 border-b-1">
					<p className="text-xl text-o-primary font-medium ">
						{title}
					</p>
					<button onClick={onClose} className="cursor-pointer">
						<Icon name="close" color="var(--color-o-primary)" />
					</button>
				</div>
				<div className="p-5 bg-primary">{children}</div>
				<div className="flex p-5 items-center justify-end gap-3 bg-secondary border-gray-100 border-t-1">
					<button
						className="py-2 px-5 rounded-lg cursor-pointer  text-o-primary font-medium border-1 border-gray-100"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="py-2 px-5 text-white rounded-lg cursor-pointer  font-medium bg-blue-600"
						onClick={onSuccess}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default Modal;

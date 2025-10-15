import "./App.css";
import { ProgressBar, TopNavbar } from "./Components";
import Board from "./pages/Board";

function App() {
	return (
		<div className="bg-primary w-screen h-screen flex flex-col">
			<TopNavbar />
			<ProgressBar />
			<Board />
		</div>
	);
}

export default App;

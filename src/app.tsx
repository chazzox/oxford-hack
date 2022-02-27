import { useState } from "react";
import Standard from "./components/standard";

export function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="bg-black min-h-screen max-h-screen w-screen">
			<h1 className="text-xl text-blue-500 text-center py-2 hover:cursor-pointer hover:underline">
				oxbotica pcd data explorer
			</h1>
			<h2 className="text-xl text-white/[0.5] text-center">controls</h2>
			<div className="flex justify-evenly my-6">
				<p className="text-xl text-white/[0.5] hover:underline hover:cursor-pointer">
					<b>a</b> - rot left
				</p>
				<p className="text-xl text-white/[0.5] hover:underline hover:cursor-pointer">
					<b>d</b> - rot left
				</p>
				<p className="text-xl text-white/[0.5] hover:underline hover:cursor-pointer">
					mouse - a lot of things
				</p>
			</div>
			<p
				className="text-lg hover:cursor-pointer underline hover:text-blue-500 transition-colors text-center select-none"
				onClick={() => setCount((p) => (p + 1) % 10)}
			>
				step next {count}
			</p>
			<div className="h-[600px]">
				<Standard index={count} />
			</div>
		</div>
	);
}

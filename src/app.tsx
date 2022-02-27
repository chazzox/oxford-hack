import { useState } from "react";
import classNames from "classnames";
import Standard from "./components/standard";

export function App() {
	const [isExperimental, setExperimental] = useState(false);

	return (
		<div className="bg-black min-h-screen w-screen flex flex-col">
			<h1 className="text-xl text-blue-500 text-center py-2 hover:cursor-pointer hover:underline">
				oxbotica pcd data explorer
			</h1>
			<h2 className="text-xl text-white/[0.8] text-center">controls: </h2>
			<div className="flex justify-evenly my-6">
				<p
					className={classNames("text-lg hover:cursor-pointer hover:underline", {
						"text-blue-500": !isExperimental,
						"text-white/[0.8]": isExperimental
					})}
					onClick={() => setExperimental(false)}
				>
					standard view
				</p>
				<p
					className={classNames("text-lg  hover:cursor-pointer hover:underline", {
						"text-blue-500": isExperimental,
						"text-white/[0.8]": !isExperimental
					})}
					onClick={() => setExperimental(true)}
				>
					experimental view
				</p>
			</div>
			<div className="flex-1">
				<Standard />
			</div>
		</div>
	);
}

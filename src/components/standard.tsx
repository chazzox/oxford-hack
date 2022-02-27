import React, { Suspense, useEffect } from "react";

import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";

enum KEYS {
	KEY_A = "a",
	KEY_D = "d"
}

const PCD: React.FC<{ index: number }> = ({ index }) => {
	const { scene } = useThree();

	const keyframe_urls = [
		"../keyframes/lidar_points_235.pcd",
		"../keyframes/lidar_points_245.pcd",
		"../keyframes/lidar_points_255.pcd",
		"../keyframes/lidar_points_265.pcd",
		"../keyframes/lidar_points_275.pcd",
		"../keyframes/lidar_points_285.pcd",
		"../keyframes/lidar_points_295.pcd",
		"../keyframes/lidar_points_305.pcd",
		"../keyframes/lidar_points_315.pcd",
		"../keyframes/lidar_points_325.pcd"
	];

	const pcd = useLoader(PCDLoader, new URL(keyframe_urls[index], import.meta.url).href);

	useEffect(() => {
		document.onkeydown = (e: KeyboardEvent) => {
			// SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP, SHUT UP
			switch (e.key) {
				case KEYS.KEY_D:
					pcd.rotateOnAxis(new Vector3(0, 0, 1).normalize(), Math.PI / 10);
					break;
				case KEYS.KEY_A:
					pcd.rotateOnAxis(new Vector3(0, 0, 1).normalize(), -Math.PI / 10);
					break;
				default:
					console.log(e.key);
					break;
			}
		};
		scene.remove.apply(scene, scene.children);
		// @ts-expect-error
		pcd.material.color.setHex(0x3b82f6);
		scene.add(pcd);
	}, [index]);

	return <></>;
};

function Loader() {
	return <Html center>loading point cloud!</Html>;
}

const Standard: React.FC<{ index: number }> = (props) => {
	return (
		<Canvas>
			<PerspectiveCamera makeDefault position={[0, 0, -30]} zoom={1} far={10000} fov={30}>
				<Suspense fallback={<Loader />}>
					<PCD {...props} />
				</Suspense>
			</PerspectiveCamera>

			<OrbitControls />
		</Canvas>
	);
};

export default Standard;

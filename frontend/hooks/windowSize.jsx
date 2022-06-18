import { useState, useEffect } from "react";

const useWindowDimensions = () => {
	const hasWindow = typeof window !== "undefined";

	function getWindowDimensions() {
		const widthInit = hasWindow ? window.innerWidth : null;
		const heightInit = hasWindow ? window.innerHeight : null;
		return {
			widthInit,
			heightInit,
		};
	}

	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [hasWindow]);

	return windowDimensions;
};

export default useWindowDimensions;

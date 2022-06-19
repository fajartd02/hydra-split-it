import Footer from "../footer/footer";
import useWindowDimensions from "../../../hooks/windowSize";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSize } from "../../../features/pagesize/pagesizeSlice";

const Layout = ({ children }) => {
	const { heightInit, widthInit } = useWindowDimensions();
	const { width, height } = useSelector((state) => state.pagesize);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateSize({ height: heightInit, width: widthInit }));
	}, []);

	return (
		<>
			<div style={{ backgroundColor: "#f5f5f5" }}>
				<div
					style={{
						backgroundColor: "white",
						maxWidth: "600px",
						minHeight: height,
						margin: "auto",
					}}
					className="d-flex flex-column"
				>
					<div className="pt-4 px-4" style={{ marginBottom: "110px" }}>
						<main>{children}</main>
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;

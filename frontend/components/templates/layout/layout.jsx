import Footer from "../footer/footer";
import useWindowDimensions from "../../../hooks/windowSize";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSize } from "../../../features/pagesize/pagesizeSlice";

const Layout = ({ children }) => {
	const [fixedHeight, setFixedHeight] = useState(null);
	const { heightInit, widthInit } = useWindowDimensions();
	const { width, height } = useSelector((state) => state.pagesize);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateSize({ height: heightInit, width: widthInit }));
	}, [dispatch]);

	return (
		<>
			<div style={{ backgroundColor: "#f5f5f5" }}>
				<div
					style={{
						backgroundColor: "white",
						maxWidth: "600px",
						minHeight: height,
						margin: "auto",
						"@media (max-width:600px)": {
							width: width,
						},
					}}
					className="d-flex flex-column align-items-center justify-content-between"
				>
					<main>{children}</main>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;

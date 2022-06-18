import { MdGroups, MdQrCode } from "react-icons/md";
import { useSelector } from "react-redux";

const Footer = () => {
	const { width, height } = useSelector((state) => state.pagesize);

	return (
		<>
			<footer
				className="fixed-bottom text-center text-lg-start d-flex flex-row align-items-center justify-content-center"
				style={{
					margin: "auto",
					maxWidth: "600px",
					"@media (maxWidth:600px)": {
						width: width,
					},
					backgroundColor: "#2C76ED",
					borderRadius: "30px 30px 0px 0px",
					gap: "20px",
				}}
			>
				<div className="py-2 px-4" style={{ fontSize: "52px", color: "white" }}>
					<MdQrCode />
				</div>
				<div className="py-2 px-4" style={{ fontSize: "52px", color: "white" }}>
					<MdGroups />
				</div>
			</footer>
		</>
	);
};

export default Footer;

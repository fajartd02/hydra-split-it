import { MdGroups, MdQrCode } from "react-icons/md";

const Footer = () => {
	return (
		<>
			<footer
				className="text-center text-lg-start d-flex flex-row align-items-center justify-content-center"
				style={{ width: "100%", backgroundColor: "#2C76ED", borderRadius: "30px 30px 0px 0px", gap: "20px" }}
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

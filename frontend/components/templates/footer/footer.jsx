import { MdHome } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { updateStepper } from "../../../features/stepper/stepperSlice";

const Footer = () => {
	const { width } = useSelector((state) => state.pagesize);
	const router = useRouter();
	const dispatch = useDispatch();

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
				<Link href="/">
					<div
						className="py-2 px-4"
						style={{
							fontSize: "52px",
							color: router.asPath == "/" ? "white" : "black",
						}}
					>
						<MdHome />
					</div>
				</Link>
				<Link href="/group">
					<button
						className="btn"
						onClick={() => {
							dispatch(updateStepper({ stepper: 0 }));
						}}
					>
						<div
							className="py-2 px-4"
							style={{
								fontSize: "52px",
								color:
									router.asPath == "/group" || router.pathname == "/group/[id]" ? "white" : "black",
							}}
						>
							<BiReceipt />
						</div>
					</button>
				</Link>
			</footer>
		</>
	);
};

export default Footer;

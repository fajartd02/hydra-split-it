import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";

const CardGroup = (props) => {
	const integerToStringRupiah = (value) => {
		return Number(value.toFixed(0)).toLocaleString().replace(",", ".");
	};

	return (
		<>
			<Link href={`/group/${props.id}`}>
				<div className="card-institute" style={{ height: "80px" }}>
					<div className="d-flex flex-row justify-content-between align-items-center">
						<div className="d-flex flex-column">
							<p style={{ fontWeight: 700 }}>
								Orderan#{Number(props.id) + 1} - {props.status == 0 ? "Ongoing" : "Success"}
							</p>
							<p>
								Rp{integerToStringRupiah(props.current)}/{integerToStringRupiah(props.target)}
							</p>
						</div>
						<p style={{ fontSize: "30px", fontWeight: "bold" }}>
							<RiArrowRightSLine />
						</p>
					</div>
				</div>
			</Link>
		</>
	);
};

export default CardGroup;

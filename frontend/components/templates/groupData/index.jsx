import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import orderData from "./data";
import CardInfoGroup from "../../molecules/group/CardInfoGroup";
import React from "react";

const GroupData = () => {
	const router = useRouter();
	const { id } = router.query;
	const group = useSelector((state) => state.group[id]);
	const orderdata = orderData[id].data;
	const integerToStringRupiah = (value) => {
		return Number(value.toFixed(0)).toLocaleString().replace(",", ".");
	};

	return (
		<>
			<div className="d-flex flex-column justify-content-between pt-2" style={{ gap: "25px" }}>
				<div className="d-flex align-items-center flex-column">
					<p style={{ fontSize: "32px", fontWeight: "bold" }}> Orderan#{Number(group.id) + 1}</p>
					<p>
						Rp{integerToStringRupiah(group.current)}/{integerToStringRupiah(group.target)}
					</p>
				</div>
				<div className="d-flex flex-column" style={{ gap: "20px" }}>
					{orderdata.map((data, index) => {
						console.log(data);
						return (
							<React.Fragment key={index}>
								<CardInfoGroup name={data.name} id={data.id} paid={data.paid} foto={data.url} />
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default GroupData;

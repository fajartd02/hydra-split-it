import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const GroupData = () => {
	const router = useRouter();
	const { id } = router.query;
	const group = useSelector((state) => state.group[id]);
	const integerToStringRupiah = (value) => {
		return Number(value.toFixed(0)).toLocaleString().replace(",", ".");
	};

	return (
		<>
			<div className="d-flex flex-column justify-content-between align-items-center pt-2">
				<p style={{ fontSize: "32px", fontWeight: "bold" }}> Orderan#{Number(group.id) + 1}</p>
				<p>
					Rp{integerToStringRupiah(group.current)}/{integerToStringRupiah(group.target)}
				</p>
			</div>
		</>
	);
};

export default GroupData;

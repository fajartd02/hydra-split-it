const CardInfoGroup = (props) => {
	const integerToStringRupiah = (value) => {
		return Number(value.toFixed(0)).toLocaleString().replace(",", ".");
	};

	return (
		<>
			<div className="d-flex flex-row align-items-center justify-content-between" style={{ gap: "20px" }}>
				<div className="d-flex flex-row align-items-center" style={{ gap: "20px" }}>
					<img
						src={props.foto}
						className="rounded-circle"
						alt="Avatar"
						style={{ height: "50px", width: "50px" }}
					/>
					<div className="d-flex flex-column" style={{ gap: "5px" }}>
						<p style={{ fontSize: "16px", fontWeight: "bold" }}>{props.name}</p>
						<p style={{ fontSize: "14px" }}>ID: {props.id}</p>
					</div>
				</div>
				<p>Rp{integerToStringRupiah(props.paid)}</p>
			</div>
		</>
	);
};

export default CardInfoGroup;

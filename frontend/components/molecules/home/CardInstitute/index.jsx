const CardInstitute = (props) => {
	return (
		<>
			<div
				className="d-flex flex-row justify-content-between align-items-center card-institute"
				style={{ height: "100px" }}
			>
				<div>
					<img src={props.srcImg} />
				</div>
				<p className="uang-institute">{props.amount}</p>
			</div>
		</>
	);
};

export default CardInstitute;

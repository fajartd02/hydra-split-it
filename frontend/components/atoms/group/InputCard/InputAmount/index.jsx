const InputAmountCard = (props) => {
	return (
		<>
			<div className="card-institute" style={{ height: "100px" }}>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className="d-flex flex-column" style={{ width: "90%", gap: "4px" }}>
						<p style={{ fontWeight: 700 }}>Masukkan Total Pembayaran</p>
						<div className="input-group input-group-sm" style={{ margin: "auto" }}>
							<span className="input-group-text">Rp</span>
							<input
								defaultValue={props.value}
								type="number"
								className="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-sm"
								onChange={(e) => {
									props.change(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InputAmountCard;

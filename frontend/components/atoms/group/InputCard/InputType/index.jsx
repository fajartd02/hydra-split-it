const InstitutionType = (props) => {
	return (
		<>
			<div className="card-institute" style={{ height: "100px" }}>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className="d-flex flex-column" style={{ width: "90%", gap: "4px" }}>
						<p style={{ fontWeight: 700 }}>Jenis Pembayaran</p>
						<div class="input-group">
							<select
								class="form-select"
								id="inputGroupSelect01"
								onChange={(e) => {
									props.change(e.target.value);
								}}
							>
								<option value="0">Gopay</option>
								<option value="1">OVO</option>
								<option value="2">BCA</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InstitutionType;

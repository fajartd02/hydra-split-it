import { MdSearch } from "react-icons/md";

const InputFriend = (props) => {
	return (
		<>
			<div style={{ marginBottom: "12px" }}>
				<p style={{ fontWeight: "bold" }}>Ajak teman anda berkolaborasi</p>
			</div>
			<div className="card-institute">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className="d-flex flex-column" style={{ width: "90%", gap: "4px" }}>
						<div class="input-group d-flex flex-row align-items-center">
							<p style={{ fontSize: "24px" }}>
								<MdSearch />
							</p>
							<input
								type="text"
								class="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-sm"
								onChange={(e) => {
									props.change(e.target.value);
								}}
								style={{ border: "none" }}
								placeholder="search by id"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InputFriend;

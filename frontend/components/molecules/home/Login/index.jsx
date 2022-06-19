import { useState } from "react";

const Login = () => {
	const [data, setData] = useState({
		username: "",
		password: "",
	});

	return (
		<>
			<div className="d-flex flex-column align-items-center" style={{ gap: "20px" }}>
				<p style={{ fontSize: "32px", fontWeight: "bold" }}>Welcome</p>
				<div className="d-flex flex-row justify-content-center align-items-center">
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{ width: "90%", gap: "4px" }}
					>
						<p style={{ fontWeight: 700 }}>Username</p>
						<div class="input-group d-flex">
							<input
								type="text"
								class="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-sm"
								onChange={(e) => {
									setData({ ...data, username: e.target.value });
								}}
							/>
						</div>
					</div>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center">
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{ width: "90%", gap: "4px" }}
					>
						<p style={{ fontWeight: 700 }}>Password</p>
						<div class="input-group d-flex">
							<input
								type="password"
								class="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-sm"
								onChange={(e) => {
									setData({ ...data, password: e.target.value });
								}}
							/>
						</div>
					</div>
					<button className="btn btn-submit" style={{ width: "50%", marginTop: "20px" }}>
						Login
					</button>
				</div>
			</div>
		</>
	);
};
export default Login;

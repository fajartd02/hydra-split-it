import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../../features/user/userSlice";

const Login = () => {
	const [data, setData] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState(false);
	const dispatch = useDispatch();

	const Login = () => {
		if (data.username == "fabianhabil") {
			if (data.password == "fabianhabil") {
				console.log("logged in");
				dispatch(setLoggedIn({ loggedIn: true }));
			}
		} else {
			setError(false);
		}
	};

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
						<div className="input-group d-flex">
							<input
								type="text"
								className="form-control"
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
						<div className="input-group d-flex">
							<input
								type="password"
								className="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-sm"
								onChange={(e) => {
									setData({ ...data, password: e.target.value });
								}}
							/>
						</div>
					</div>
					<button className="btn btn-submit" style={{ width: "50%", marginTop: "20px" }} onClick={Login}>
						Login
					</button>
				</div>
			</div>
		</>
	);
};
export default Login;

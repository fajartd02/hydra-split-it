import { IoMdSettings } from "react-icons/io";
import AddInstitute from "../../molecules/home/AddInstitute";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
const InstituteCard = dynamic(import("../../molecules/home/Institute/index"));
import Login from "../../molecules/home/Login";

const Home = () => {
	const [winReady, setwinReady] = useState(false);
	const { loggedIn, user } = useSelector((state) => state.user);

	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<>
			<div className="d-flex flex-column justify-content-between">
				<div className="d-flex flex-row justify-content-between align-items-center judul-home">
					<p>Split It!</p>
					{loggedIn && <IoMdSettings />}
				</div>
				{loggedIn ? (
					<>
						<div className="d-flex flex-row align-items-center" style={{ gap: "20px" }}>
							<img
								src="/fabian.jpg"
								className="rounded-circle"
								alt="Avatar"
								style={{ height: "120px" }}
							/>
							<div className="d-flex flex-column" style={{ gap: "5px" }}>
								<p style={{ fontSize: "24px", fontWeight: "bold" }}>Fabian</p>
								<p style={{ fontSize: "16px" }}>ID: fabianhabil</p>
							</div>
						</div>
						<div
							className="d-flex flex-column align-items-center justify-content-center uang-home"
							style={{ gap: "10px" }}
						>
							<p className="judul-uang">Total Saldo</p>
							<p className="total-uang">Rp6.800.000</p>
						</div>
						<div className="d-flex flex-column" style={{ gap: "4px", marginTop: "24px" }}>
							<p>Prioritas Pembayaran</p>
							{winReady ? <InstituteCard /> : null}
							<AddInstitute />
						</div>
					</>
				) : (
					<>
						<Login />
					</>
				)}
			</div>
		</>
	);
};

export default Home;

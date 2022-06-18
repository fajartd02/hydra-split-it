import { IoMdSettings } from "react-icons/io";
import AddInstitute from "../../molecules/home/AddInstitute";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const InstituteCard = dynamic(import("../../molecules/home/Institute/index"));

const Home = () => {
	const [winReady, setwinReady] = useState(false);

	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<>
			<div className="d-flex flex-column justify-content-between">
				<div className="d-flex flex-row justify-content-between align-items-center judul-home">
					<p>Split It!</p>
					<IoMdSettings />
				</div>
				<div className="d-flex flex-row align-items-center" style={{ gap: "20px" }}>
					<img
						src="https://cdn.vox-cdn.com/thumbor/b0PmAywJc1nLA9vUkyJo5-jFmBE=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23633427/GettyImages_1395371342.jpg"
						className="rounded-circle"
						alt="Avatar"
						style={{ height: "120px" }}
					/>
					<div className="d-flex flex-column" style={{ gap: "5px" }}>
						<p style={{ fontSize: "24px", fontWeight: "bold" }}>Elon Musk</p>
						<p style={{ fontSize: "16px" }}>ID: mas_elon</p>
					</div>
				</div>
				<div
					className="d-flex flex-column align-items-center justify-content-center uang-home"
					style={{ gap: "10px" }}
				>
					<p>Total Saldo</p>
					<p className="total-uang">Rp2.700.000</p>
				</div>
				<div className="d-flex flex-column" style={{ gap: "16px", marginTop: "24px" }}>
					<p>Prioritas Pembayaran</p>
					{winReady ? <InstituteCard /> : null}
					<AddInstitute />
				</div>
			</div>
		</>
	);
};

export default Home;

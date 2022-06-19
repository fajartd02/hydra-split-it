import InputAmountCard from "../../../atoms/group/InputCard/InputAmount";
import InstitutionType from "../../../atoms/group/InputCard/InputType";
import InputDestination from "../../../atoms/group/InputCard/InputDestination";
import InputFriend from "../../../atoms/group/InputCard/InputFriend";
import { MdQrCode } from "react-icons/md";
import React, { useState } from "react";
import { updateStepper } from "../../../../features/stepper/stepperSlice";
import { useDispatch } from "react-redux";

const InputGroup = () => {
	const [data, setData] = useState({
		amount: 0,
		type: 0,
		destination: "",
	});

	const [search, setSearch] = useState("");

	const changeValueAmount = (value) => {
		setData({ ...data, amount: Number(value) });
	};

	const changeValueType = (value) => {
		setData({ ...data, type: Number(value) });
	};

	const changeValueDestination = (value) => {
		setData({ ...data, destination: value });
	};

	const dispatch = useDispatch();

	return (
		<>
			<div
				className="d-flex flex-row align-items-center judul-home"
				style={{ color: "black", fontSize: "24px", gap: "16px" }}
			>
				<MdQrCode style={{ fontSize: "50px" }} />
				<p>Barcode Mode</p>
			</div>
			<div style={{ marginLeft: "4px" }}>
				<div className="d-flex flex-column" style={{ gap: "8px" }}>
					<InputAmountCard change={changeValueAmount} value={data.amount} />
					<InstitutionType change={changeValueType} value={data.type} />
					<InputDestination change={changeValueDestination} />
					<div style={{ marginTop: "8px" }}>
						<InputFriend change={setSearch} />
					</div>
					<button
						className="btn btn-submit"
						style={{ marginTop: "8px" }}
						onClick={() => {
							dispatch(updateStepper({ stepper: 2 }));
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};
export default InputGroup;

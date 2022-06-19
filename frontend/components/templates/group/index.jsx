import React, { useState } from "react";
import CardGroup from "../../molecules/group/CardGroup";
import { useSelector, useDispatch } from "react-redux";
import AddGroup from "../../molecules/group/AddGroup";
import InputGroup from "../../molecules/group/InputGroup";
import { updateStepper } from "../../../features/stepper/stepperSlice";
import Link from "next/link";
import NoticeAddGroup from "../../molecules/group/SuccessAddGroup";

const Group = () => {
	const group = useSelector((state) => state.group);
	const { stepper } = useSelector((state) => state.stepperGroup);
	const dispatch = useDispatch();

	return (
		<>
			<div className="d-flex flex-column justify-content-between pt-2">
				{stepper == 0 && (
					<>
						<div
							className="d-flex flex-row justify-content-between align-items-center judul-home"
							style={{ color: "black", fontSize: "24px" }}
						>
							<p>Orderan Anda</p>
						</div>
						<div className="d-flex flex-column" style={{ gap: "12px" }}>
							{group.map((data, index) => {
								return (
									<React.Fragment key={index}>
										<CardGroup
											id={data.id}
											status={data.status}
											target={data.target}
											current={data.current}
										/>
									</React.Fragment>
								);
							})}
							<button
								className="btn"
								onClick={() => {
									dispatch(updateStepper({ stepper: 1 }));
								}}
							>
								<AddGroup />
							</button>
						</div>
					</>
				)}
				{stepper == 1 && <InputGroup />}
				{stepper == 2 && <NoticeAddGroup />}
			</div>
		</>
	);
};

export default Group;

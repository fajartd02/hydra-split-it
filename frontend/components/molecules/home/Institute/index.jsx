import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import institutedata from "../../../templates/home/data";
import CardInstitute from "../CardInstitute";

const Institute = () => {
	const [instituteData, setInstituteData] = useState(institutedata);

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(instituteData);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setInstituteData(items);
	}

	return (
		<>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="instituteData">
					{(provided) => (
						<ul
							{...provided.droppableProps}
							ref={provided.innerRef}
							className="d-flex flex-column"
							style={{ gap: "16px" }}
						>
							{instituteData.map(({ id, srcImg, amount }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div>
													<CardInstitute srcImg={srcImg} amount={amount} />
												</div>
											</li>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};
export default Institute;

import {useDrag} from "react-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripLines} from "@fortawesome/free-solid-svg-icons";
import {Types} from "../../shared/DragAndDrop";

export const SidebarLane = (props) => {
    const [{isDragging}, drag] = useDrag({
        item: {
            id: "add",
            type: Types.LANE
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult === undefined || dropResult === null || !dropResult.hasOwnProperty("newIndex")) return;

            if (props.step.includes("init")) {
                props.changeStep("laneAdded");
            }

            props.addLane("Lane" + (dropResult.newIndex === 0 ? "" : " " + dropResult.newIndex), dropResult.newIndex);
        },
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });
    let className = "drag drag_lane " + (isDragging ? "active" : "");
    return (
        <div ref={drag} className={className}>
            <FontAwesomeIcon icon={faGripLines}/>
            Add lane
        </div>
    );
}
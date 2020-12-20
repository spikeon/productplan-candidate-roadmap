import {useDrag} from "react-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripLines} from "@fortawesome/free-solid-svg-icons";
import {Types} from "../../shared/DragAndDrop";

let barCounter = 0;

export const SidebarBar = (props) => {
    const [{isDragging}, drag] = useDrag({
        item: {
            id: "add",
            type: Types.BAR
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult === undefined || dropResult === null || !dropResult.hasOwnProperty("laneName")) return;

            if (props.step.includes("laneAdded")) {
                props.changeStep("barAdded");
            }

            let barName = "Roadmap Item " + ++barCounter;
            props.addBar(dropResult.laneName, dropResult.row, barName, dropResult.month, dropResult.year, 3)
                .then((result) => {
                    if (!result) {
                        return props.addBar(dropResult.laneName, dropResult.row, barName, dropResult.month, dropResult.year, 2)
                    } else return true;

                })
                .then((result) => {
                    if (result !== true) {
                        return props.addBar(dropResult.laneName, dropResult.row, barName, dropResult.month, dropResult.year, 1)
                    } else return true;
                })
                .then((result) => {
                    if (result !== true) {
                        console.log("Failed to add new bar");
                    } else return true;
                })

        },
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }

    });
    let className = "drag drag_bar " + (isDragging ? "active" : "");
    return (
        <div ref={drag} className={className}>
            <FontAwesomeIcon icon={faGripLines}/>
            Add bar
        </div>
    );
}
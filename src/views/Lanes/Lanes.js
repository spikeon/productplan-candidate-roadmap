import {Lane} from "../Lane/Lane";
import "./Lanes.scss"
import {useDrop} from "react-dnd";
import {Types} from "../../shared/DragAndDrop";
import {faCircle, faDotCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Lanes(props) {
    const [{canDrop}, drop] = useDrop({
        accept: Types.LANE,
        drop: () => {
            return {
                props,
                newIndex: lanes.length
            };

        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const lanes = props.timeline.map((lane) => (
        <Lane
            key={lane.name}
            lane={lane}
            editBar={props.editBar}
            removeBar={props.removeBar}
        />
    ));

    const dates = [];
    const dots = [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    for (let i = 1; i <= 12; i++) {
        currentMonth++;
        let date = "";

        if (currentMonth > 12) {
            currentMonth = currentMonth - 12;
            currentYear++;
        }

        if (currentMonth === 1) {
            date += "Q1"
            date += " " + currentYear;
        } else if (currentMonth === 4) {
            date += "Q2"
        } else if (currentMonth === 7) {
            date += "Q3"
        } else if (currentMonth === 10) {
            date += "Q4"
        }

        if (currentMonth !== 1 && i === 1) {
            date += " " + currentYear;
        }


        dates.push(<div className="date">{date}</div>)

        dots.push(<div className="dot"><FontAwesomeIcon icon={faCircle} size={6}/></div>)
    }

    let className = "lanes " + (canDrop ? "active" : "");

    return (
        <div className="timeline_container">
            <div className="dates">{dates}</div>
            <div className="dots">{dots}</div>
            <div ref={drop} className={className}>
                {lanes}
                <div className="drop_here">Drop Here</div>
            </div>
        </div>
    );
}
import {Bar} from "../Bar/Bar";
import {Cell} from "../Cell/Cell";
import "./Lane.scss";
import {useDrop} from "react-dnd";
import {Types} from "../../shared/DragAndDrop";
import {faArrowDown, faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Lane(props) {
    const [{canDrop}] = useDrop({
        accept: Types.BAR,
        drop: () => {
            console.log(props);
            return props
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    let rows = [];
    let blockedMonths = 0;
    for (let r = 0; r <= props.lane.rows.length; r++) {
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let cells = [];
        let zindex = 999;
        for (let i = 0; i < 12; i++) {
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = currentMonth - 12;
                currentYear++;
            }

            let currentBar = null;

            if (props.lane.rows[r] !== undefined) {
                for (let bar of props.lane.rows[r]) {
                    if (bar.startMonth === currentMonth && bar.startYear === currentYear) {
                        currentBar = <Bar
                            key={bar.name}
                            bar={bar}
                            editBar={props.editBar}
                            removeBar={props.removeBar}
                        />;
                        blockedMonths = bar.months;
                        break;
                    }
                }
            }
            if (currentBar === null) {
                blockedMonths--;
                let width = 3;
                let className = "hover_bar bar width" + width;
                currentBar = <div className={className} />;
            }

            cells.push(
                <Cell
                    key={currentYear + "_" + currentMonth}
                    laneName={props.lane.name}
                    row={r + 1}
                    month={currentMonth}
                    year={currentYear}
                    zindex={zindex--}
                    blocked={blockedMonths > 0}>
                    {currentBar}
                </Cell>);
        }
        rows.push(cells);
    }
    console.log(rows);
    let rowElements = [];
    for (let row in rows) {
        rowElements.push(<div key={"row_" + row} className="row">{rows[row]}</div>)
    }

    let rowsClass = "rows " + (canDrop ? "active" : "");

    let isOpen = true;
    let displayIcon = isOpen ? faCaretDown : faCaretRight;

    return (
        <div className="lane">
            <div className="lane_header">
                <FontAwesomeIcon icon={displayIcon}/>
                {props.lane.name}
            </div>
            <div className={rowsClass}>
                {rowElements}
            </div>
        </div>
    );
}

Lane.propTypes = {};
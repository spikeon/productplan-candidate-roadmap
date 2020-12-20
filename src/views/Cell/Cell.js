import * as PropTypes from "prop-types";
import "./Cell.scss"
import {useDrop} from "react-dnd";
import {Types} from "../../shared/DragAndDrop";

export function Cell(props) {
    const [{canDrop, isOver}, drop] = useDrop({
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
    const isActive = !props.blocked && canDrop && isOver;
    const className = "cell " + (isActive ? "active" : "");
    return <div ref={drop} style={{zIndex: props.zindex}} className={className}>{props.children}</div>;
}

Cell.propTypes = {
    laneName: PropTypes.string,
    row: PropTypes.number,
    year: PropTypes.number,
    month: PropTypes.number,
    children: PropTypes.node,
    zindex: PropTypes.number,
    blocked: PropTypes.bool
};
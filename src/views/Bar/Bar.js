import "./Bar.scss";
import {useDrag} from "react-dnd";
import {Types} from "../../shared/DragAndDrop";

export function Bar(props) {
    const [{isDragging}, drag] = useDrag({
        item : {
            id: props.bar.name,
            type: Types.BAR
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult === undefined || dropResult === null || !dropResult.hasOwnProperty("laneName")) return; //props.removeBar(props.bar.laneName, props.bar.name);
            // I was hoping to get this working before turning this in but I have run out of time
            // props.editBar(props.bar.laneName, props.bar.name, dropResult.laneName, dropResult.row, props.bar.name, props.bar.startMonth, props.bar.startYear, props.bar.months)
        },
        collect: monitor => {
            return {
                isDragging : monitor.isDragging()
            }
        }

    });
    let className = "bar " + (isDragging ? "active" : "");
    return (
        <div ref={drag} className={className} style={{width: "calc(" + (props.bar.months * 100) + "% - 2px)"}}>
            <span className="name">{props.bar.name}</span>
        </div>
    );
}

Bar.propTypes = {};
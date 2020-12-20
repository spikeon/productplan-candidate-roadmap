import "./ToolTip.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ToolTipItem} from "./ToolTipItem";
import {ToolTipData} from "./ToolTipData";


export function ToolTip(props) {
    let className = "tooltip " + (!props.step.includes("Closed") ? "active" : "closed");
    let currentToolTip = ToolTipData[props.step] !== undefined ? ToolTipData[props.step] : new ToolTipItem("", "", "");
    return <div className={className}>
        <div className="close-x" onClick={() => {
            props.changeStep(props.step + "Closed");
        }}>
            <FontAwesomeIcon icon={faTimes}/>
        </div>
        {currentToolTip.image !== "" ? <img src={currentToolTip.image} alt="tooltip image"/> : ""}

        <h2>{currentToolTip.title}</h2>
        <div className="content">{currentToolTip.content}</div>
        <div className="button" onClick={() => {
            props.changeStep(props.step + "Closed");
        }}>Got it
        </div>
        <div className="triangle"/>
    </div>;
}

import {Component} from "react";
import "./Sidebar.scss"
import {SidebarBar} from "./SidebarBar";
import {SidebarLane} from "./SidebarLane";


export class Sidebar extends Component {
    render() {
        return <div className="sidebar">
            <SidebarLane
                step={this.props.step}
                changeStep={this.props.changeStep}
                addLane={this.props.addLane}
            />
            <SidebarBar
                step={this.props.step}
                changeStep={this.props.changeStep}
                addBar={this.props.addBar}
            />
        </div>;
    }
}

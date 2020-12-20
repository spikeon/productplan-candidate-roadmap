import {Component} from "react";
import * as PropTypes from "prop-types";
import "./PageHeader.scss";

export default class PageHeader extends Component {
    render() {
        return (
            <div className="page_header">
                <h1>{this.props.title}</h1>
                <div className="tab current">Roadmap</div>
                <div className="tab">Planning board</div>
                <div className="tab">Parking lot</div>
            </div>
        );
    }
}

PageHeader.propTypes = {
    title: PropTypes.string
};

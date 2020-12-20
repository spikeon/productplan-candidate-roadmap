import {Component} from "react";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss"
import logo from "../../Resources/logo.png"
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <img className="logo" alt="logo" src={logo} />
                <div className="title">Candidate Roadmap</div>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        );
    }
};

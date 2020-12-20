import './App.scss';
import {Component} from "react";
import {Lanes} from "../Lanes/Lanes";
import {Sidebar} from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import PageHeader from "../PageHeader/PageHeader";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ToolTip} from "../ToolTip/ToolTip";

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.timelineService = props.timelineService;
        this.state = {
            timeline: [],
            step: "init"
        }
    }

    componentDidMount() {
        this.getTimeline();
    }

    async getTimeline() {
        return this.timelineService.retrieveItems().then((timeline) => {
            this.setState({timeline});
        });
    }

    async addLane(name, index) {
        return this.timelineService.addLane(name, index).then(success => {
            if (!success) {
                // display error text
            }
            this.getTimeline();
        });
    }

    async addBar(laneName, rowNum, name, startMonth, startYear, months = 3) {
        console.log("Called addBar", laneName, rowNum, name, startMonth, startYear, months);

        return this.timelineService.addBar(laneName, rowNum, name, startMonth, startYear, months).then(success => {
            if (!success) {
                // display error text
            }
            this.getTimeline();
            return success;
        });
    }

    async editLane(oldName, newName, index) {
        return this.timelineService.editLane(oldName, newName, index).then(success => {
            if (!success) {
                // display error text
            }
            this.getTimeline();
        });
    }

    async editBar(oldLaneName, oldName, laneName, rowNum, name, startMonth, startYear, months = 3) {
        return this.timelineService.editBar(oldLaneName, oldName, laneName, rowNum, name, startMonth, startYear, months).then(success => {
            if (!success) {
                // display error text
            }
            this.getTimeline();
        });
    }


    async removeBar(laneName, name) {
        return this.timelineService.removeBar(laneName, name).then(success => {
            if (!success) {
                // display error text
            }
            this.getTimeline();
        });
    }

    async removeLane(laneName, name) {
        return this.timelineService.removeLane(laneName).then(success => {
            if (!success) {
                // display error text
            }
            this.getTimeline();
        });
    }

    async canPlaceBar(laneName, rowNum, startMonth, startYear) {
        return this.timelineService.canPlaceBar(laneName, rowNum, startMonth, startYear).then(result => {
            return result;
        });
    }

    changeStep(step) {
        this.setState({step});
    }


    render() {
        return (
            <div className="App">
                <DndProvider backend={HTML5Backend}>
                    <Header/>
                    <PageHeader title="Product roadmap"/>
                    <div className="content_container">
                        <Lanes
                            timeline={this.state.timeline}
                            addBar={this.addBar.bind(this)}
                            editBar={this.editBar.bind(this)}
                            removeBar={this.removeBar.bind(this)}
                            addLane={this.addLane.bind(this)}
                            editLane={this.editBar.bind(this)}
                            removeLane={this.removeLane.bind(this)}
                            canPlaceBar={this.canPlaceBar.bind(this)}
                        />
                        <Sidebar
                            addBar={this.addBar.bind(this)}
                            addLane={this.addLane.bind(this)}
                            step={this.state.step}
                            changeStep={this.changeStep.bind(this)}
                        />
                        <ToolTip step={this.state.step} changeStep={this.changeStep.bind(this)}/>
                    </div>
                </DndProvider>
            </div>
        );
    }
}

export default App;

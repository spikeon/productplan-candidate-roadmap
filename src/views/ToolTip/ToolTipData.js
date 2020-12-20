import {ToolTipItem} from "./ToolTipItem";
// Note: I'm sorry about the quality of these images, I'm experienced with photoshop but I can't afford a licence right
// now, so I'm without the tool I know how to use to create the required images with overlaid cursors and stuff
import addLaneImg from "../../Resources/add-lane.png";
import addBarImg from "../../Resources/add-bar.png"

export const ToolTipData = {
    init: new ToolTipItem(
        addLaneImg,
        "We'll start with a lane",
        [
            <p>Lanes represent high level categories, such as teams, product lines, or strategic initiatives. Add a color
                and a description to your lane to communicate valuable details to stakeholders.</p>,
            <p>Drag and Drop a lane to get started</p>
        ]),
    laneAdded: new ToolTipItem(
        addBarImg,
        "Awesome!  Now let's add a few bars.",
        [
            <p>Bars are your specific initiative.  Use them to represent your epics, projects, or tasks, and provide an at a glance view of priority, relationships and progress</p>,
            <p>Drag and drop a bar to get started.</p>
        ]
    ),
    barAdded: new ToolTipItem(
        "",
        "Alright let's set up a couple more",
        [
            <p>Once they're added, you can share out your roadmap with your teams.</p>
        ]
    ),
}
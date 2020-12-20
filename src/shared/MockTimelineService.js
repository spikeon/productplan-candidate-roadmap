import {TimelineLane} from "./Timeline";

const timelineStore = [];

export default class TimelineService {

    async retrieveItems() {
        return timelineStore;
    }

    async getLane(laneName) {
        for (let lane of timelineStore) {
            if (lane.name === laneName) return lane;
        }
        return null;
    }

    async addLane(laneName, index) {
        for (let lane of timelineStore) {
            if (lane.name === laneName) return false;
        }
        timelineStore.splice(index, 0, new TimelineLane(laneName));
        return true;
    }

    async removeLane(laneName) {
        let timeline = timelineStore.slice();
        let removeIndex = null;
        for (let lane in timeline) {
            if (timeline[lane].name === laneName) {
                removeIndex = lane;
                break;
            }
        }
        if (removeIndex !== null) {
            timeline.splice(removeIndex, 1);
            return true;
        }
        return false;
    }

    async editLane(oldLaneName, newLaneName, index) {
        let timeline = timelineStore.slice();
        let laneIndex = null;
        for (let lane in timeline) {
            if (timeline[lane].name === oldLaneName) laneIndex = lane;
        }

        if (laneIndex === null) {
            // Lane not found
            return false;
        }
        let lane = timeline[laneIndex].slice();
        lane.name = newLaneName;
        if (laneIndex !== index) {
            // Same position
            timeline.splice(laneIndex, 1);
            timeline.splice(index, 0, lane);
        }
        return true;
    }

    async addBar(laneName, rowNum, name, startMonth, startYear, months = 3) {
        console.log("Called addBar", laneName, rowNum, name, startMonth, startYear, months);

        return this.getLane(laneName).then(
            (lane) => {
                if (lane == null) return null;
                return lane.addBar(rowNum, name, startMonth, startYear, months)
            }
        );
    }

    async getBar(laneName, barName) {
        return this.getLane(laneName).getBar(barName);
    }

    async editBar(oldLaneName, oldName, laneName, rowNum, name, startMonth, startYear, months = 3) {
        if (laneName === oldLaneName) {
            return this.getLane(laneName).editBar(oldLaneName, oldName, laneName, rowNum, name, startMonth, startYear, months);
        } else {
            await this.getLane(oldLaneName).removeBar(oldName).then((success) => {
                if (success) return this.getLane(laneName).addBar(rowNum, name, startMonth, startYear, months);
                else return null;
            });
        }

    }

    async removeBar(laneName, barName) {
        return this.getLane(laneName).removeBar(barName);
    }

    async canPlaceBar(laneName, rowNum, startMonth, startYear) {
        return this.getLane(laneName).checkRowPositionAvailableDate(rowNum, startMonth, startYear)
    }
}
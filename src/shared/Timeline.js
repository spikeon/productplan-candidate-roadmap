export class TimelineLane {
    rows = [];

    constructor(name) {
        this.name = name;
    }

    addBar(row, name, startMonth, startYear, months = 3) {
        let currentRow;
        let rows = this.rows.slice();
        for (let row of rows) {
            for (let bar of row) {
                if (bar.name === name) return false;
            }
        }
        let newBar = new TimelineBar(name, startMonth, startYear, months);
        if (row > this.rows.length) {
            currentRow = [];
            rows.push(currentRow);
            currentRow.push(newBar);
        } else {
            currentRow = rows[row - 1];
            if (this.checkRowPositionAvailable(currentRow, newBar)) currentRow.push(newBar);
            else return false;
        }

        this.rows = rows;
        return true;
    }

    getBar(barName) {
        for (let row of this.rows) {
            for (let bar of row) {
                if (bar.name === barName) return bar;
            }
        }
        return null;
    }

    removeBar(barName) {
        let rows = this.rows.slice();
        let removeRow = null;
        let removeBar = null;
        rowLoop: for (let row in rows) {
            for (let bar of rows[row]) {
                if (rows[row][bar].name === barName) {
                    removeRow = row;
                    removeBar = bar;
                    break rowLoop;
                }
            }
        }

        if (removeRow !== null) {
            rows[removeRow].splice(removeBar, 1);
            this.rows = rows;
            return true;
        }

        return false;
    }

    editBar(oldName, row, name, startMonth, startYear, months = 3) {
        if (this.removeBar(oldName)) {
            return this.addBar(row, name, startMonth, startYear, months);
        } else {
            return false;
        }
    }

    checkRowPositionAvailable(row, newBar) {
        if (row.length === 0) return true;
        let taken = [];
        for (let bar of row) {
            let barTaken = this.getTakenMonths(bar);
            for (let month of barTaken) {
                taken.push(month);
            }
        }
        let barTaken = this.getTakenMonths(newBar);

        for (let month of barTaken) {
            if (taken.includes(month)) return false;
        }
        return true;
    }

    checkRowPositionAvailableDate(row, month, year) {
        if (row.length === 0) return true;
        let taken = [];
        for (let bar of row) {
            let barTaken = this.getTakenMonths(bar);
            for (let month of barTaken) {
                taken.push(month);
            }
        }
        return !taken.includes(this.getDateString(month, year));
    }

    getDateString(month, year) {
        return year + "_" + month;
    }

    getTakenMonths(bar) {
        let taken = [];
        for (let i = 0; i < bar.months; i++) {
            if (bar.startMonth + i > 12) {
                taken.push(this.getDateString(bar.startYear + 1, bar.startMonth + i - 12));
            } else {
                taken.push(this.getDateString(bar.startYear, bar.startMonth + i));
            }
        }
        return taken;
    }
}

export class TimelineBar {
    constructor(name, startMonth, startYear, months = 3) {
        this.name = name;
        this.startMonth = startMonth;
        this.startYear = startYear;
        this.months = months;
    }
}
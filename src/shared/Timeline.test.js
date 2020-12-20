import {render, screen} from '@testing-library/react';
import {TimelineLane} from "./Timeline";

test('Test validation of bars into rows', () => {
    let lane = new TimelineLane("test");
    lane.addBar(1, "test 1", 11, 2020, 3);
    lane.addBar(2, "test 2", 10, 2020, 3);
    lane.addBar(1, "test 3", 11, 2020, 3); // Should fail
    lane.addBar(1, "test 4", 1, 2021, 3); // Should fail, tests year gap
    lane.addBar(1, "test 5", 2, 2021, 3);
    expect(lane.rows.length).toBe(2);
    expect(lane.rows[0].length).toBe(2);
    expect(lane.rows[1].length).toBe(1);
});

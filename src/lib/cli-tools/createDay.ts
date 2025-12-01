import {
    getCurrentDayInMonth,
    getCurrentYear,
} from '../../helpers/dateUtils.ts';
import { getFullPath } from '../../helpers/getFullPath.ts';

export const createDay = (day?: string, year?: string) => {
    if (!day) {
        day = getCurrentDayInMonth();
    }
    if (!year) {
        year = getCurrentYear();
    }
    const path = getFullPath(day, year);
    console.log(path);
    //create input file

    //download input

    //create example file

    //download example

    //create index.ts
};

import { normalize } from '@std/path';
import {
    getCurrentDayInMonth,
    getCurrentYear,
} from '../../helpers/dateUtils.ts';
import { getFullPath } from '../../helpers/getFullPath.ts';

export const runDay = async (day?: string, year?: string) => {
    if (!day) {
        day = getCurrentDayInMonth();
    }
    if (!year) {
        year = getCurrentYear();
    }
    const path = getFullPath(day, year);
    const normalizedPath = normalize(path);
    console.log(Deno.cwd());

    //make sure this path exists!

    const dayModule = await import(
        `file:///${Deno.cwd()}/${normalizedPath}/index.ts`
    );
    // console.clear()
    dayModule.runProblem();
};

/**
 * Runs the current day
 */
// const runCurrentDay = async () => {
//     const currentDay = new Date();
//     const firstDay = new Date('2024-12-01T00:00:00Z');
//     const differenceInDays = (difference(currentDay, firstDay).days ?? 0) + 1;
//     const paddedDifference = differenceInDays.toString().padStart(2, '0');
//     const fullPath = `./${currentDay.getFullYear()}\\${paddedDifference}\\index.ts`;
//     const dayModule = await import(fullPath);
//     dayModule.runProblem();
// };

/**
 * Runs a specified day by passing the day and year
 * @param day
 * @param year
 */
// const runSpecificDay = async (day: string, year: string = '2024') => {
//     const dayFixed = day.length === 2 ? day : `0${day}`;
//     const fullPath = `./${year}\\${dayFixed}\\index.ts`;
//     const dayModule = await import(fullPath);
//     dayModule.runProblem();
// };

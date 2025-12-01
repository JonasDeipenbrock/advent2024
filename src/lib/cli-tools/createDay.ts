import {
    getCurrentDayInMonth,
    getCurrentYear,
} from '../../helpers/dateUtils.ts';
import { getFullPath } from '../../helpers/getFullPath.ts';
import { join, normalize } from '@std/path';

export const createDay = async (day?: string, year?: string) => {
    if (!day) {
        day = getCurrentDayInMonth();
    }
    if (!year) {
        year = getCurrentYear();
    }
    const path = getFullPath(day, year);

    //create input file
    const normalizedPath = normalize(path);
    console.log(normalizedPath);
    await Deno.mkdir(join(normalizedPath, '..'), { recursive: true });
    await Deno.writeTextFile(normalizedPath, '//auto created by cli helper');
    //download input

    //create example file

    //download example

    //create index.ts
};

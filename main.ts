import { difference } from '@std/datetime';

/**
 * Runs the current day
 */
const runCurrentDay = async () => {
    const currentDay = new Date();
    const firstDay = new Date('2024-12-01T00:00:00Z');
    const differenceInDays = (difference(currentDay, firstDay).days ?? 0) + 1;
    const paddedDifference = differenceInDays.toString().padStart(2, '0');
    const fullPath = `./${currentDay.getFullYear()}\\${paddedDifference}\\index.ts`;
    const dayModule = await import(fullPath);
    dayModule.runProblem();
};

/**
 * Runs a specified day by passing the day and year
 * @param day
 * @param year
 */
// deno-lint-ignore no-unused-vars
const runDay = async (day: string, year: string = '2024') => {
    const dayFixed = day.length === 2 ? day : `0${day}`;
    const fullPath = `./${year}\\${dayFixed}\\index.ts`;
    const dayModule = await import(fullPath);
    dayModule.runProblem();
};

if (import.meta.main) {
    runCurrentDay();
}

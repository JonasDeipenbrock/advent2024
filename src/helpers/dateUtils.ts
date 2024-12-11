import { difference } from '@std/datetime';

/**
 * Gets the current Day in Month unpadded
 * @returns
 */
export const getCurrentDayInMonth = () => {
    const currentDay = new Date();
    const firstDay = new Date('2024-12-01T00:00:00Z');
    const differenceInDays = (difference(currentDay, firstDay).days ?? 0) + 1;
    return differenceInDays.toString();
};

export const getCurrentYear = () => {
    return new Date().getFullYear().toString();
};

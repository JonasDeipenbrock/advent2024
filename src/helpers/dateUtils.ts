/**
 * Gets the current Day in Month unpadded
 * @returns
 */
export const getCurrentDayInMonth = () => {
    const currentDay = new Date();
    const dayInMonth = currentDay.getDate();
    // const firstDay = new Date('2024-12-01T00:00:00Z');
    // const differenceInDays = (difference(currentDay, firstDay).days ?? 0) + 1;
    return dayInMonth.toString();
};

export const getCurrentYear = () => {
    return new Date().getFullYear().toString();
};

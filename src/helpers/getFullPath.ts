const BASE_PATH = './src';

export const getFullPath = (day: string, year: string) => {
    const paddedDay = day.padStart(2, '0');
    const fullPath = `${BASE_PATH}/${year}/${paddedDay}`;
    return fullPath;
};

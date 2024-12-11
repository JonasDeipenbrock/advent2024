export const getFullPath = (day: string, year: string) => {
    console.log('getting path for', day, year);
    const paddedDay = day.padStart(2, '0');
    const fullPath = `./${year}\\${paddedDay}\\index.ts`;
    return fullPath;
};

import { readInput } from '../../helpers/readInput.ts';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('2024/02/example.txt')));
    console.log('1: ' + runPartOne(readInput('2024/02/input.txt')));
    console.log('Example 2: ' + runPartTwo(readInput('2024/02/example.txt')));
    console.log('2: ' + runPartTwo(readInput('2024/02/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n');
    let result = 0;
    lines.forEach((line) => {
        const levels = line.trim().split(' ');
        const numLevels = levels.map((curr) => parseInt(curr));
        let prev = numLevels[0];
        let prevDiff = numLevels[0] - numLevels[1];
        const invalid = numLevels.slice(1).some((lvl) => {
            const diff = prev - lvl;
            const absDiff = Math.abs(diff);
            if (absDiff < 1 || absDiff > 3) {
                return true;
            }
            // both decreasing: -1 and -2
            // both increasing: 1 and 2
            // => check if mult is positive!
            const diffDiff = diff * prevDiff;
            if (diffDiff < 1) {
                return true;
            }
            prev = lvl;
            prevDiff = diff;
        });
        if (!invalid) result++;
    });
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    let result = 0;
    lines.forEach((line) => {
        const levels = line.trim().split(' ');
        const numLevels = levels.map((curr) => parseInt(curr));
        const possibleReports = [
            numLevels,
            ...numLevels.map((_value, idx) => {
                const posRep = [...numLevels];
                posRep.splice(idx, 1);
                return posRep;
            }),
        ];
        const valid = possibleReports.some((report) => {
            // true if a valid solution can be found
            let prev = report[0];
            let prevDiff = report[0] - report[1];
            const invalid = report.slice(1).some((lvl) => {
                const diff = prev - lvl;
                const absDiff = Math.abs(diff);
                if (absDiff < 1 || absDiff > 3) {
                    return true;
                }
                // both decreasing: -1 and -2
                // both increasing: 1 and 2
                // => check if mult is positive!
                const diffDiff = diff * prevDiff;
                if (diffDiff < 1) {
                    return true;
                }
                prev = lvl;
                prevDiff = diff;
            });
            return !invalid;
        });
        if (valid) result++;
    });
    return result;
};

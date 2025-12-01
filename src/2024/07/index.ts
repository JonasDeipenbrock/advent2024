import { readInput } from '../../helpers/readInput.ts';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('src/2024/07/example.txt')));
    console.log('1: ' + runPartOne(readInput('src/2024/07/input.txt')));
    console.log(
        'Example 2: ' + runPartTwo(readInput('src/2024/07/example.txt'))
    );
    console.log('2: ' + runPartTwo(readInput('src/2024/07/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n').map((line) => line.trim());
    let result = 0;

    lines.forEach((line) => {
        const values = line.split(':');
        const testValue = parseInt(values[0]);
        console.log(line);
    });
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    lines.forEach((line) => {});
    return result;
};

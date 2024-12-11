import { readInput } from '../../src/helpers/readInput.ts';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('src/2024/01/example.txt')));
    console.log('1: ' + runPartOne(readInput('src/2024/01/input.txt')));
    console.log(
        'Example 2: ' + runPartTwo(readInput('src/2024/01/example.txt'))
    );
    console.log('2: ' + runPartTwo(readInput('src/2024/01/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    lines.forEach((line) => {});
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    lines.forEach((line) => {});
    return result;
};

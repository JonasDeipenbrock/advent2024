import { readInput } from '../../helpers/readInput.ts';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('2024/01/example.txt')));
    console.log('1: ' + runPartOne(readInput('2024/01/input.txt')));
    console.log('Example 2: ' + runPartTwo(readInput('2024/01/example.txt')));
    console.log('2: ' + runPartTwo(readInput('2024/01/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    const left: number[] = [];
    const right: number[] = [];
    lines.forEach((line) => {
        const splits = line.split('  ');
        left.push(parseInt(splits[0]));
        right.push(parseInt(splits[1]));
    });
    left.sort();
    right.sort();
    left.forEach((lefty, index) => {
        result += Math.abs(lefty - right[index]);
    });
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    let result = 0;

    const left: number[] = [];
    const right = new Map();
    lines.forEach((line) => {
        const splits = line.trim().split('  ');
        left.push(parseInt(splits[0]));
        const righty = parseInt(splits[1]);
        if (right.has(righty)) {
            right.set(righty, parseInt(right.get(righty)) + 1);
        } else {
            right.set(righty, 1);
        }
    });
    left.forEach((lefty) => {
        result += lefty * (right.get(lefty) ?? 0);
    });
    return result;
};

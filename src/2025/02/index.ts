import { createRegExp, exactly, global, multiline, digit } from 'magic-regexp';

const DAY_PATH = './src/2025/02';

export const runProblem = () => {
    // console.log(
    //     'Example 1: ' + runPartOne(readInput(`${DAY_PATH}/example.txt`))
    // );
    // console.log('1: ' + runPartOne(readInput(`${DAY_PATH}/input.txt`)));
    console.log(
        'Example 2: ' + runPartTwo(readInput(`${DAY_PATH}/example.txt`))
    );
    console.log('2: ' + runPartTwo(readInput(`${DAY_PATH}/input.txt`)));
};

//29940924880

const runPartOne = (input: string) => {
    const lines = input.split(',').map((a) => a.trim());
    let result = 0;
    for (const line of lines) {
        const [firstId, secondId] = line.split('-');
        for (let id = Number(firstId); id <= Number(secondId); id++) {
            const idString = id.toString();
            const idLength = idString.length;
            const idHalf = Math.floor(idLength / 2);
            const firstHalf = idString.slice(0, idHalf);
            const secondHalf = idString.slice(idHalf, idLength);
            if (firstHalf === secondHalf) {
                result += id;
            }
        }
    }
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split(',').map((a) => a.trim());
    let result = 0;
    let result2 = 0;
    const part1Regex = new RegExp(/^(\d+)\1$/);
    const part2Regex = new RegExp(/^(\d+)\1+$/);
    console.log(part1Regex);
    for (const line of lines) {
        const [firstId, secondId] = line.split('-');
        for (let id = Number(firstId); id <= Number(secondId); id++) {
            const idString = id.toString();
            const match1 = idString.match(part1Regex);
            const match2 = idString.match(part2Regex);
            if (match1) {
                result += id;
            }
            if (match2) result2 += id;
        }
    }
    console.log(result);
    return result2;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

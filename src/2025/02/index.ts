const DAY_PATH = './src/2025/02';

export const runProblem = () => {
    console.log(
        'Example 1: ' + runPartOne(readInput(`${DAY_PATH}/example.txt`))
    );
    console.log('1: ' + runPartOne(readInput(`${DAY_PATH}/input.txt`)));
    console.log(
        'Example 2: ' + runPartTwo(readInput(`${DAY_PATH}/example.txt`))
    );
    console.log('2: ' + runPartTwo(readInput(`${DAY_PATH}/input.txt`)));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n').map((a) => a.trim());
    const result = lines.length;
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n').map((a) => a.trim());
    const result = lines.length;
    return result;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

const DAY_PATH = './src/2025/06';

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
    let result = 0;
    const problems = input.split('\n').map((a) =>
        a
            .trim()
            .split(' ')
            .filter((x) => x !== '')
    );
    const operators = problems.pop()!;
    for (
        let problemIndex = 0;
        problemIndex < problems[0].length;
        problemIndex++
    ) {
        const operator = operators[problemIndex];
        const numbers = problems.map((line) => Number(line[problemIndex]));
        const neutralStart = operator === '+' ? 0 : 1;
        const tmpResult = numbers.reduce((sum, curr) => {
            if (operator === '+') return sum + curr;
            return sum * curr;
        }, neutralStart);
        result += tmpResult;
    }
    return result;
};

const runPartTwo = (input: string) => {
    let result = 0;
    const lines = input.split('\n');
    const operators = lines.pop()!;

    const operatorMap: { operator: string; start: number; end: number }[] = [];
    for (let idx = operators.length - 1; idx >= 0; idx--) {
        const c = operators[idx];
        if (c !== ' ') {
            const lastEntry = operatorMap[operatorMap.length - 1];
            let end = operators.length - 1;
            if (lastEntry) end = lastEntry.start - 2;
            operatorMap.push({
                operator: c,
                start: idx,
                end: end,
            });
        }
    }

    for (const op of operatorMap) {
        const numbers = [];
        for (let idx = op.start; idx <= op.end; idx++) {
            let rawNumberString = '';
            for (const line of lines) {
                rawNumberString += line[idx];
            }
            numbers.push(Number(rawNumberString));
        }

        const neutralStart = op.operator === '+' ? 0 : 1;
        const tmpResult = numbers.reduce((sum, curr) => {
            if (op.operator === '+') return sum + curr;
            return sum * curr;
        }, neutralStart);
        result += tmpResult;
    }
    return result;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

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
    const MAX_NUM = 99 + 1;
    const commands = input.split('\n').map((a) => a.trim());
    let dial_pos = 50;
    let result = 0;
    for (const command of commands) {
        const direction = command[0];
        let steps = Number(command.substring(1));
        if (direction === 'L') {
            steps = -steps;
        }
        dial_pos = dial_pos + steps;
        if (dial_pos < 0) {
            dial_pos += 100;
        }
        dial_pos = dial_pos % MAX_NUM;
        if (dial_pos === 0) result++;
    }
    return result;
};

const runPartTwo = (input: string) => {
    const commands = input.split('\n').map((a) => a.trim());
    let dial_pos = 50;
    let result = 0;
    for (const command of commands) {
        const direction = command[0];
        let steps = Number(command.substring(1));
        if (direction === 'L') {
            steps = -steps;
        }

        result +=
            steps > 0
                ? Math.floor((dial_pos + steps) / 100) -
                  Math.floor(dial_pos / 100)
                : Math.floor((dial_pos - 1) / 100) -
                  Math.floor((dial_pos - 1 + steps) / 100);

        dial_pos = (dial_pos + steps + 100) % 100;
    }
    return result;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

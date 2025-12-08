const DAY_PATH = './src/2025/03';

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
    const banks = input.split('\n').map((a) => a.trim());
    let result = 0;
    for (const bank of banks) {
        let maxNumber = 0;
        let secondNumber = Number(bank[bank.length - 1]);
        for (let index = bank.length - 2; index >= 0; index--) {
            const curr = Number(bank[index]);
            if (curr >= maxNumber) {
                if (secondNumber < maxNumber) {
                    secondNumber = maxNumber;
                }
                maxNumber = curr;
            }
        }
        const joltageString = maxNumber + '' + secondNumber;
        result += Number(joltageString);
    }
    return result;
};

const runPartTwo = (input: string) => {
    const banks = input.split('\n').map((a) => a.trim());
    let result = 0;
    const batteryLength = 12;
    for (const bank of banks) {
        const numBank = bank.split('').map((x) => Number(x));
        const bankLength = numBank.length;

        const battery: string[] = [];
        let pos = 0;
        for (
            let remainingBatteries = batteryLength;
            remainingBatteries > 0;
            remainingBatteries--
        ) {
            const cuttedBank = numBank.slice(
                pos,
                bankLength - remainingBatteries + 1
            );

            const bestNum = Math.max(...cuttedBank);
            pos = cuttedBank.findIndex((x) => x === bestNum) + 1 + pos;
            battery.push(bestNum.toString());
        }
        const joltageString = battery.join('');
        result += Number(joltageString);
    }
    return result;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

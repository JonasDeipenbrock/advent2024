const DAY_PATH = './src/2025/07';

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
    let hitSplitters = 0;
    const lines = input.split('\n').map((a) => a.trim());
    const start = lines
        .splice(0, 1)[0]
        .split('')
        .findIndex((x) => x === 'S')!;
    let beams = new Set([start]);
    for (const line of lines) {
        const newBeams = new Set<number>();
        for (const beam of beams) {
            if (line[beam] === '^') {
                hitSplitters++;
                newBeams.add(beam - 1);
                newBeams.add(beam + 1);
            } else {
                newBeams.add(beam);
            }
        }
        beams = newBeams;
    }
    return hitSplitters;
};

const runPartTwo = (input: string) => {
    let hitSplitters = 0;
    const lines = input.split('\n').map((a) => a.trim());
    const start = lines
        .splice(0, 1)[0]
        .split('')
        .map((x, idx) => (x === 'S' ? [idx, 1] : [idx, 0]));
    const beams = new Map<number, number>();
    start.forEach((s) => beams.set(s[0], s[1]));
    for (const line of lines) {
        for (const [idx, amount] of beams) {
            if (amount === 0) continue;
            if (line[idx] === '^') {
                hitSplitters++;
                beams.set(idx, 0);
                beams.set(idx - 1, beams.get(idx - 1)! + amount);
                beams.set(idx + 1, beams.get(idx + 1)! + amount);
            }
        }
    }
    const timelines = beams.values().reduce((prev, curr) => prev + curr, 0);
    return timelines;
};

export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

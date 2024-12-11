import { readInput } from '../../helpers/readInput.ts';
import { createRegExp, exactly, global, multiline, digit } from 'magic-regexp';
import { joinToString } from '@std/collections';

export const runProblem = () => {
    console.log('Example: ' + runPartOne(readInput('2024/03/example.txt')));
    console.log('1: ' + runPartOne(readInput('2024/03/input.txt')));
    console.log('Example 2: ' + runPartTwo(readInput('2024/03/example.txt')));
    console.log('2: ' + runPartTwo(readInput('2024/03/input.txt')));
};

const runPartOne = (input: string) => {
    const lines = input.split('\n');
    const unlines = lines.map((line) => line.trim());
    const line = joinToString(unlines, (a) => a, { separator: '' });
    let result = 0;
    const regex = createRegExp(
        exactly('mul(')
            .and(exactly(digit.times.between(1, 3).groupedAs('firstNumber')))
            .and(',')
            .and(exactly(digit.times.between(1, 3).groupedAs('secondNumber')))
            .and(')'),
        [multiline, global]
    );
    const matches = line.matchAll(regex);
    for (const match of matches) {
        const num1 = parseInt(match.groups.firstNumber!);
        const num2 = parseInt(match.groups.secondNumber!);
        result += num1 * num2;
    }
    return result;
};

const runPartTwo = (input: string) => {
    const lines = input.split('\n');
    const unlines = lines.map((line) => line.trim());
    const line = joinToString(unlines, (a) => a, { separator: '' });
    let result = 0;
    const regex = createRegExp(
        exactly(
            exactly('mul(')
                .and(
                    exactly(digit.times.between(1, 3).groupedAs('firstNumber'))
                )
                .and(',')
                .and(
                    exactly(digit.times.between(1, 3).groupedAs('secondNumber'))
                )
                .and(')')
        ).or(exactly('do()').or("don't()").groupedAs('trigger')),
        [multiline, global]
    );
    const matches = line.matchAll(regex);
    let enabled = true;
    for (const match of matches) {
        const trigger = match.groups.trigger;
        if (trigger) {
            if (trigger === 'do()') {
                enabled = true;
                continue;
            } else {
                enabled = false;
                continue;
            }
        }
        if (!enabled) continue;
        const num1 = parseInt(match.groups.firstNumber!);
        const num2 = parseInt(match.groups.secondNumber!);
        result += num1 * num2;
    }
    return result;
};

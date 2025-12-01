import { ParseArgs } from './read-args.ts';
import { promptSelect } from '@std/cli/unstable-prompt-select';
import { runDay } from './runDay.ts';
import { createDay } from './createDay.ts';
import {
    getCurrentDayInMonth,
    getCurrentYear,
} from '../../helpers/dateUtils.ts';
import { ValidYears } from '../../types/validYears.ts';

export const interactiveRunning = (_args: ParseArgs) => {
    console.log('Starting interactive aoc cli');
    console.log('Please select the mode: ');
    const selectedOption = promptSelect(
        'Please select the mode',
        ['create', 'run', 'help'],
        { clear: true }
    );
    if (!selectedOption) {
        console.log('No option selected, ending cli');
        return;
    }
    runDay;
    console.log('selected option ', selectedOption);
    switch (selectedOption) {
        case 'create':
            handleCreateInteractivly();
            break;
        case 'run':
            runDay();
            break;
        default:
            break;
    }
};

const handleCreateInteractivly = () => {
    const selectedYear = prompt('Please enter a year: ', getCurrentYear());
    if (!selectedYear || !ValidYears.includes(selectedYear)) {
        console.log('Unexpected year, only year where aoc existed are valid.');
        return;
    }
    const selectedDay = prompt('Please enter a day: ', getCurrentDayInMonth());
    const dayAsNumber = Number(selectedDay);
    if (
        !selectedDay ||
        !dayAsNumber ||
        dayAsNumber < 0 ||
        dayAsNumber > 31 ||
        !Number.isInteger(dayAsNumber)
    ) {
        console.log('Unexpected value entered for the day.');
        return;
    }

    createDay(selectedDay, selectedYear);
};

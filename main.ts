import { createDay } from './src/lib/cli-tools/createDay.ts';
import { interactiveRunning } from './src/lib/cli-tools/interactive.ts';
import { parseAocArgs } from './src/lib/cli-tools/read-args.ts';
import { runDay } from './src/lib/cli-tools/runDay.ts';

if (import.meta.main) {
    const args = parseAocArgs(Deno.args);
    if (args['help']) {
        console.log(
            'Welcome to Jonas AoC create and run script or short ACARS!'
        );
        console.log('-----------');
        console.log(
            'Run the command with --create or -c to create a new folder for the current or chosen day.'
        );
        console.log('-----------');
        console.log(
            'Run the command with --day or -d to set the target day. If no day is given this defaults to the current day.'
        );
        console.log('-----------');
        console.log(
            'Run the command with --year or -y to set the target year. Defaults to the current year'
        );
    } else if (args['create']) {
        createDay(args['day'], args['year']);
    } else if (args['run']) {
        runDay(args['day'], args['year']);
    } else {
        interactiveRunning(args);
    }
    // runCurrentDay();
}

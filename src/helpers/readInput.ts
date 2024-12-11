export const readInput = (path: string) => {
    return Deno.readTextFileSync(path);
};

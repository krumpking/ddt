


export function findOccurrences(array: any[], value: any): number {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            count++;
        }
    }
    return count;
}

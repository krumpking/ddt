import Random from "./random";


export function isBase64(str: string) {
    if (str === '' || str.trim() === '') { return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

export function createId(): string {
    return Random.randomString(13, "abcdefghijklmnopqrstuvwxyz");
}


export function searchStringInMembers(forms: any[], searchString: string): any[] {
    // Iterate over the array of members.
    const matches = [];

    for (const member of forms) {
        // Check if the search string is present in any of the member properties.
        for (const key in member) {

            let k: any = member[key];

            if (k === searchString) {
                if (!containsObject(matches, member)) {
                    matches.push(member);
                }
            }
            if (typeof k == 'string') {

                if (contains(k, searchString)) {

                    if (!containsObject(matches, member)) {
                        matches.push(member);
                    }

                }
            }
        }
    }

    // Return the array of matches.
    return matches;
}


function contains(haystack: string, needle: string): boolean {
    return haystack.indexOf(needle) !== -1;
}


function containsObject(array: Array<any>, object: any): boolean {
    return array.some(element => {
        return Object.keys(object).every(key => element[key] === object[key]);
    });
}


export function getDate(dateString: string) {
    const d = new Date(dateString);

    return `${d.getDate()} ${showMonth(d.getMonth())} ${d.getFullYear()}`;
}

export function getMonth(dateString: string) {
    const d = new Date(dateString);

    return `${showMonth(d.getMonth())}`;
}

const showMonth = (no: number) => {
    switch (no + 1) {
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
        default:
            break
    }
}
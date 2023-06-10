import { IForm } from "../types/types";
import { print } from "./console";
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
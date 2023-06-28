import { print } from "./console";
import { numberWithCommas } from "./stringM";



export function findOccurrences(array: any[], value: any): number {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            count++;
        }
    }
    return count;
}


export function findOccurrencesProducts(array: any[], value: any): number {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].product === value) {
            count++;
        }
    }
    return count;
}


export function addTotalValue(array: any[], value: any): number {
    let total: number = 0.0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].product === value) {
            total += parseFloat(array[i].value.replace('$', '').replace(',', ''));
        }
    }
    return parseFloat(total.toFixed(2));
}

export function highest(givenArray: any[]) {
    let itemsMap: any = {};
    let maxValue = 0;
    let maxCount = 0;

    // 3
    for (let item of givenArray) {
        // 4
        if (itemsMap[item] == null) {
            itemsMap[item] = 1;
        } else {
            itemsMap[item]++;
        }

        //5
        if (itemsMap[item] > maxCount) {
            maxValue = item;
            maxCount = itemsMap[item];
        }
    }

    return {
        value: maxValue,
        count: maxCount
    }
}

export function highestProduct(givenArray: any[]) {
    let itemsMap: any = {};
    let maxValue = 0;
    let maxCount = 0;

    // 3
    for (let item of givenArray) {
        // 4
        if (itemsMap[item.product] == null) {
            itemsMap[item.product] = 1;
        } else {
            itemsMap[item.product]++;
        }

        //5
        if (itemsMap[item.product] > maxCount) {
            maxValue = item.product;
            maxCount = itemsMap[item];
        }
    }

    return {
        value: maxValue,
        count: maxCount
    }
}


export function getSalesRepMapFromArray(arr: any[]) {
    let arrRes: any = [];
    let checkArr: any = [];

    for (var i = 0; i < arr.length; i++) {
        var key = arr[i].salesPerson;

        if (checkArr.includes(key)) {


            for (let index = 0; index < arrRes.length; index++) {
                const element = arrRes[index];
                if (element.person == key) {
                    let valArr = element.value;
                    valArr.push(arr[i]);
                    arrRes[index] = { person: key, value: valArr }

                }

            }


        } else {
            let valArr = [];
            valArr.push(arr[i]);
            arrRes.push({ person: key, value: valArr })
            checkArr.push(key);
        }
    }


    return arrRes;
}


export function getProductsRepMapFromArray(arr: any[]) {
    let arrRes: any = [];
    let checkArr: any = [];

    for (var i = 0; i < arr.length; i++) {
        var key = arr[i].enquired[0].product;


        if (checkArr.includes(key)) {


            for (let index = 0; index < arrRes.length; index++) {
                const element = arrRes[index];
                if (element.product == key) {
                    let valArr = element.value;
                    valArr.push(arr[i]);
                    arrRes[index] = { product: key, value: valArr }

                }

            }


        } else {
            let valArr = [];
            valArr.push(arr[i]);
            arrRes.push({ product: key, value: valArr })
            checkArr.push(key);
        }





    }


    return arrRes;
}


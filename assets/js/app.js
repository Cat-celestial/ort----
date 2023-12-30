let inpt = document.querySelector("#inp");
inpt.focus();
let labelBillAm = document.querySelector("#billAmLabel");
let labelBills = document.querySelector("#billsLabel");

let billsList = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
let billsInATM = {
    1000: 5,
    500: 1,
    200: 2,
    100: 10,
    50: 1,
    20: 2,
    10: 6,
    5: 0,
    2: 2,
    1: 5
};

function decomposeNumber(number) {
    if (isNaN(number) || number < 1 || number > 10000) return console.error("Введіть коректне число в діапазоні від 1 до 10000");

    const decomposedArray = String(number).split('').map((digit, index, arr) => digit * 10 ** (arr.length - index - 1)).filter(value => value > 0);

    return decomposedArray.length > 0 ? decomposedArray : [0];
}

// Приклад використання
const number = 58;
const decomposedArray = decomposeNumber(number);
console.log(decomposedArray);  // Вивід: [400, 50, 8]




function mainFunc() {
    let sum = inpt.value;
    console.clear();
    let billsAm = 0;
    let billsNeedList = [];

    let sumMas = sum.split("").reverse();
    let edsList = [];
    for (let i in sumMas) {
        edsList.push(parseInt(sumMas[i] + "0".repeat(i)));
    }
    edsList = edsList.reverse();

    for (let number of edsList) {
        let num = number;
        for (let bankNote in billsInATM) {
            if ((billsInATM[bankNote] * bankNote) > num) {
                let bankNNeed = Math.floor(num / billsInATM[bankNote]);
                billsInATM[bankNote] -= bankNNeed;

                for (let i = bankNNeed; i > 0; i--) {
                    billsNeedList.push(bankNote);
                }
                billsAm += bankNNeed;
                num -= bankNNeed * bankNote;
            }
        }
    }

    console.log(sum);
    console.log(edsList);

    console.log(billsAm);
    console.log(billsNeedList);
}

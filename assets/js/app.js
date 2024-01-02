let inpt = document.querySelector("#inp");
inpt.focus();
let labelBillAm = document.querySelector("#billAmLabel");
let labelBills = document.querySelector("#billsLabel");

let billsList = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

function mainFunc() {
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
    let sum = parseInt(inpt.value);
    console.clear();
    let billsAm = 0;
    let billsNeedList = [];

    for (let bankNote of billsList) {
        // console.log("Банкнота: ", bankNote);
        if (sum >= bankNote && billsInATM[bankNote] > 0) {
            let bNNeed = Math.floor(sum / bankNote);
            // console.log("Банкнот ", bankNote, " нужно ", bNNeed);

            for (let am = billsInATM[bankNote]; am > 0; am--) {
                if (bNNeed > 0) {
                    billsNeedList.push(bankNote);
                    bNNeed -= 1;
                    billsAm += 1;
                    sum -= bankNote;
                    billsInATM[bankNote] -= 1;
                }
            }
        }
    }

    labelBillAm.textContent = `Количество купюр: ${billsAm}`;
    labelBills.textContent = `Купюры: ${billsNeedList.join(" ")}`;
    console.log(sum);

    console.log(billsAm);
    console.log(billsNeedList);
}
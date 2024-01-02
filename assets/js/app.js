let inpt = document.querySelector("#inp");
inpt.focus();
let labelBillAm = document.querySelector("#billAmLabel");
let labelBills = document.querySelector("#billsLabel");
let bLab = document.querySelector("#showBills");

let billsList = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
let billsInATM = {
    1000: 0,
    500: 0,
    200: 0,
    100: 10,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 45
};

function mainFunc() {
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
    if (sum != 0) {
        labelBillAm.textContent = `Количество купюр: в банкомате на хватает купюр`;
        labelBills.textContent = `Купюры: `;

    } else if (billsAm >= 40) {
        labelBillAm.textContent = `Количество купюр: банкомат не выдает больше чем 40 купюр за раз`;
        labelBills.textContent = `Купюры: `;

    } else if (sum == 0) {
        labelBillAm.textContent = `Количество купюр: ${billsAm}`;
        labelBills.textContent = `Купюры: ${billsNeedList.join("; ")}`;
    }

    console.log(billsInATM);
}
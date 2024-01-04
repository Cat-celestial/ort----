let inpt = document.querySelector("#inp");
inpt.focus();
let labelBillAm = document.querySelector("#billAmLabel");
let labelBills = document.querySelector("#billsLabel");
let bLab = document.querySelector("#showBills");

let billsList = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
let billsInATM = {
    1000: 10,
    500: 10,
    200: 10,
    100: 10,
    50: 10,
    20: 10,
    10: 10,
    5: 10,
    2: 10,
    1: 10
};


function mainFunc() {
    let sum = parseInt(inpt.value);
    console.clear();
    let billsAm = 0;
    let billsNeedList = [];
    let everyBillAm = [];

    for (let bankNote of billsList) {
        // console.log("Банкнота: ", bankNote);
        if (sum >= bankNote && billsInATM[bankNote] > 0) {
            let bNNeed = Math.floor(sum / bankNote);
            // console.log("Банкнот ", bankNote, " нужно ", bNNeed);

            if (bNNeed >= billsInATM[bankNote]) {
                billsNeedList.push(bankNote);
                everyBillAm.push(billsInATM[bankNote]);

                billsAm += billsInATM[bankNote];
                sum = sum - (billsInATM[bankNote] * bankNote);
                billsInATM[bankNote] = 0;

            } else if (bNNeed < billsInATM[bankNote]) {
                billsNeedList.push(bankNote);
                everyBillAm.push(bNNeed);

                billsAm += bNNeed;
                sum = sum - (bNNeed * bankNote);
                billsInATM[bankNote] -= bNNeed;
            }

            // for (let am = billsInATM[bankNote]; am > 0; am--) {
            //     if (bNNeed > 0) {
            //         billsNeedList.push(bankNote);
            //         bNNeed -= 1;
            //         billsAm += 1;
            //         sum -= bankNote;
            //         billsInATM[bankNote] -= 1;
            //     }
            // }
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
        labelBills.textContent = `Купюры: ${billsNeedList.map((bl, index) => `${bl} x ${everyBillAm[index]}`).join("; ")}`;
    }

    console.log(billsInATM);
}
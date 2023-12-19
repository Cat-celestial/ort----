let incomeInp = document.querySelector(".incomeInput");
incomeInp.focus();
let fitOutput = document.querySelector(".fitSum");

let monyFiltsList = [0, 11600, 47150, 100525, 191950, 243725, 609350, 1000000000000];
let ratesList = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];

function changeFIT() {
    let fit = 0;
    let monyForTax = incomeInp.value - 14600;

    if (monyForTax > 0) {
        for (let i = 0; i < monyFiltsList.length; i++) {
            let lowRate = monyFiltsList[i];
            let upRate = monyFiltsList[i + 1];
            let t = (monyForTax - lowRate) * ratesList[i];

            if (monyForTax > lowRate) {
                fit = fit + t;       
            } else {
                fitOutput.textContent = `$ ${fit.toFixed(2)}`;
                break;
            }
        }
    } else {
        fitOutput.textContent = "$ 0.00"
    }
}
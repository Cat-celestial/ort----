let incomeInp = document.querySelector(".incomeInput");
incomeInp.focus();
let fitOutput = document.querySelector(".fitSum");

let monyFiltsList = [609350, 243725, 191950, 100525, 47150, 11600, 0];
let ratesList = [0.37, 0.35, 0.32, 0.24, 0.22, 0.12, 0.1];

function changeFIT() {
    let monyForTax = incomeInp.value - 14600;
    
    if (monyForTax > 0) {
        let fit = 0;
        for (let i = 0; i <= monyFiltsList.length; i++) {
            let nowRate = monyFiltsList[i];

            if (monyForTax >= monyFiltsList[i]) {
                let diff = (monyForTax - nowRate) * ratesList[i];
                fit += diff;
                console.log(ratesList[i], diff, fit);
                monyForTax = nowRate;
            }
        }
        fitOutput.textContent = `$ ${fit.toFixed(2)}`
    } else {
        fitOutput.textContent = "$ 0.00"
    }
}

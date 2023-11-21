document.querySelector(".openedImg").style.width = document.querySelector(".closedImg").style.width;

function checkFun1() {
    document.querySelector(".checkButton").style.cssText = `
        margin-top: ${"11.7px"};
        margin-left: ${"33px"};
        border-right: ${"4.3px solid orange"};
        border-bottom: ${"5px solid orange"};
    `;
}

function checkFun2() {
    document.querySelector(".checkButton").style.cssText = `
        margin-top: ${"10px"};
        margin-left: ${"30px"};
        border-right: ${"6px solid orange"};
        border-bottom: ${"8px solid orange"};
    `;
}

function changeImgOnCheck() {
    if (document.querySelector(".mainInp").value == 1234) {
        document.querySelector(".openedImg").style.cssText = `
            z-index: ${"30"};
        `;

    }
}

function changeFun1() {
    document.querySelector(".refreshButton").style.cssText = `
        margin-top: ${"11.7px"};
        margin-left: ${"33px"};
        border-right: ${"4.3px solid orange"};
        border-bottom: ${"5px solid orange"};
    `;
}

function changeFun2() {
    document.querySelector(".refreshButton").style.cssText = `
        margin-top: ${"10px"};
        margin-left: ${"30px"};
        border-right: ${"6px solid orange"};
        border-bottom: ${"8px solid orange"};
    `;
}

function changeImgOnChange() {
    document.querySelector(".openedImg").style.cssText = `
        z-index: ${"10"};
    `;

    document.querySelector(".mainInp").value = "";
}

function chekFunc() {
    checkFun1();
    setTimeout(checkFun2, 100);
    setTimeout(changeImgOnCheck, 200);
}

function changeFuncMain() {
    changeFun1();
    setTimeout(changeFun2, 100);
    setTimeout(changeImgOnChange, 200);
}


// Задание похожее на дз 19 урока

let sum = 1000;
let rate = 24;
let term = 12;

let monthRate = rate / 12;

for (let i = 1; i <= term; i++) {
    let profit = Math.round(sum * monthRate) / 100;
    sum = Math.round((sum + profit) * 100) / 100;
    console.log(`#${i} profit: ${profit}, sum: ${sum}`);
}

console.log(`Result: ${sum}`);

// Оъяснение для дз для 19 урока (кредит)

let sum1 = 1000;
let rate1 = 24;
let term1 = 4;




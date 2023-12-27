let inpt = document.querySelector("#inp");

let mark = 0;
let answerCounter = 0;
let answNumb = 1;
let rightAnsws = {};
let wrongAnsws = {};

let realAnsws = [];

inpt.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("butt").click();
    }
});

function mainFunc() {
    inpt.focus();
    let userAnsw = inpt.value;

    if (answerCounter < 12) {
        if (inpt.value != "") {
            inpt.setAttribute("placeholder", `Введите ответ на задачу ${answNumb + 1}`);
            inpt.value = "";
            inpt.focus();
            
            if (userAnsw == realAnsws[answerCounter]) {
                rightAnsws[answerCounter + 1] = userAnsw;
                mark += 1;
            } else {
                wrongAnsws[answerCounter + 1] = userAnsw;
            }
            
            answNumb += 1;
            answerCounter += 1;
        }

    }

    if (answerCounter == 12) {
        console.log(`Оценка: ${mark}`);

        console.log("Правильные ответы: ");
        console.log(rightAnsws);

        console.log("Не правильные ответы: ");
        console.log(wrongAnsws);

    }

}

for (let i = 0; i < 12; i++) {
    let firstNum = parseInt(_.shuffle(_.range(5, 10)).slice(0, 1));
    let secondNum = parseInt(_.shuffle(_.range(1, 5)).slice(0, 1));
    realAnsws.push(firstNum * secondNum);

    console.log(`${i + 1}) ${firstNum} * ${secondNum} = `);
}


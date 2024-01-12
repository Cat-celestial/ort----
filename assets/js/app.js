let mainInp = document.querySelector("#mainInp");
mainInp.focus();
let butt = document.querySelector("button");
let innValidityLab = document.querySelector("#innCorrectLab");
let birthDayLab = document.querySelector("#birthDayLab");
let genderLab = document.querySelector("#genderLab");
let yearsLab = document.querySelector("#yearsLab");

let months = ["Января", "Февраля", "Марта", "Апреля", "Мая",
    "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

let daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Субота"]

function mainFunc() {
    let innStr = String(mainInp.value);
    let innList = mainInp.value.split("").map((item) => +item).reverse();

    let checkSum = innStr[0] * -1 + innStr[1] * 5 + innStr[2] * 7 + innStr[3] * 9 + innStr[4] * 4 + innStr[5] * 6 + innStr[6] * 10 + innStr[7] * 5 + innStr[8] * 7;
    let checkNum = checkSum % 11;
    // console.log(checkNum);

    checkNum = (checkNum >= 10) ? checkNum % 10 : checkNum;
    // parseInt(checkNum);
    // console.log(checkNum);

    if (innList.length == 10 && checkNum == innList[0]) {
        innValidityLab.innerHTML = `ИНН <span class="green">корректен</span>`;

        let gender = (num) => (num % 2 === 0) ? "Пол: женский" : "Пол: мужской";
        genderLab.textContent = gender(innList[1]);

        let birthDays = parseInt(innStr.substring(0, 5));
        let dt = new Date("1899-12-31");
        dt.setDate(dt.getDate() + birthDays);

        birthDayLab.textContent = `Дата рождения: ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}, ${daysOfWeek[dt.getDay()]}`;
        // console.log(dt.getDay());

        let fullBirthDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        let nowadays = new Date();
        // let nowadays = new Date(nowadaysString.getFullYear(), nowadaysString.getMonth(), nowadaysString.getDate());

        let yearOld = Math.floor(Math.ceil(Math.abs(nowadays.getTime() - fullBirthDate.getTime()) / (1000 * 3600 * 24)) / 365);

        yearsLab.textContent = `Полных лет человеку: ${yearOld}`;
    } else {
        innValidityLab.innerHTML = `ИНН <span class="red">НЕ</span> корректен`;
        birthDayLab.textContent = "Дата рождения: ";
        genderLab.textContent = "Пол: ";
        yearsLab.textContent = "Полных лет человеку: ";
    }

}
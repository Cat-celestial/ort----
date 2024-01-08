let mainInp = document.querySelector("#mainInp");
mainInp.focus();
let butt = document.querySelector("button");
let innValidityLab = document.querySelector("#innCorrectLab");
let birthDayLab = document.querySelector("#birthDayLab");
let genderLab = document.querySelector("#genderLab");
let yearsLab = document.querySelector("#yearsLab");

let months = ["Января", "Февраля", "Марта", "Апреля", "Мая",
    "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

let daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Субота", "Воскресенье"]

// let dt = new Date("1899-12-31");
// dt.setDate(dt.getDate() + 34634);

// let fullBirthDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
// console.log(fullBirthDate.getTime());

var date1 = new Date('12-09-2017');
var date2 = new Date('12-10-2017');
var daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
console.log(daysLag)



function mainFunc() {
    let inn = String(mainInp.value);
    let innList = mainInp.value.split("").map((item) => +item).reverse();

    if (innList.length == 10) {
        innValidityLab.textContent = "ИНН корректен";
    } else {
        innValidityLab.textContent = "ИНН НЕ корректен";
    }

    let gender = (num) => (num % 2 === 0) ? "Пол: женский" : "Пол: мужской";
    genderLab.textContent = gender(innList[0]);

    let birthDays = parseInt(inn.substring(0, 5));
    let dt = new Date("1899-12-31");
    dt.setDate(dt.getDate() + birthDays);

    birthDayLab.textContent = `Дата рождения: ${dt.getUTCDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}, ${daysOfWeek[dt.getDay() - 1]}`;

    let fullBirthDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    let nowadays = new Date();
    // let nowadays = new Date(nowadaysString.getFullYear(), nowadaysString.getMonth(), nowadaysString.getDate());

    let yearOld = Math.ceil(Math.abs(nowadays.getTime() - fullBirthDate.getTime()) / (1000 * 3600 * 24));

    yearsLab.textContent = `Полных лет человеку: ${yearOld}`;
}
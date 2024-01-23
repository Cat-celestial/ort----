const url = await fetch('https://fakestoreapi.com/products');
const storeObj = await url.json();
console.log(storeObj);

let clothBox = document.querySelector(".mainClothBox");

for (let item of storeObj) {
    let newTag = document.createElement("div");
    let cutDesc = 100;
    let dots = "...";

    if (item.title.length > 60) {
        cutDesc = 60;
    } else if (item.title.length < 60) {
        dots = "";
    }

    newTag.innerHTML = `
        <div class="clothBox">
            <img src="${item.image}" height="100px" class="prodImg">
            <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
            <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
            <h5 class="price">$${item.price}</h5>
        </div>
    `;


    clothBox.appendChild(newTag);
}

let pricesNormalList = [];
for (let prod of storeObj) {
    pricesNormalList.push(prod.price);
}
let priceIncr = pricesNormalList.slice().sort((a, b) => a - b);
let priceDecr = priceIncr.slice().reverse();


console.log("Цены по порядку", pricesNormalList);
console.log("Цены по спаданию", priceDecr);
console.log("Цены по возрастанию", priceIncr);

let incInp = document.querySelector("#increaseInp");
incInp.addEventListener("click", function () {
    clothBox.innerHTML = "";

    for (let pr of priceIncr) {
        let newTag = document.createElement("div");
        let cutDesc = 100;
        let dots = "...";

        let item = storeObj[pricesNormalList.indexOf(pr)];

        if (item.title.length > 60) {
            cutDesc = 60;
        } else if (item.title.length < 60) {
            dots = "";
        }

        newTag.innerHTML = `
            <div class="clothBox">
                <img src="${item.image}" height="100px" class="prodImg">
                <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
                <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
                <h5 class="price">$${item.price}</h5>
            </div>
        `;


        clothBox.appendChild(newTag);
    }
});

let decrInp = document.querySelector("#decreaseInp");
decrInp.addEventListener("click", function () {
    clothBox.innerHTML = "";

    for (let pr of priceDecr) {
        let newTag = document.createElement("div");
        let cutDesc = 100;
        let dots = "...";

        let item = storeObj[pricesNormalList.indexOf(pr)];

        if (item.title.length > 60) {
            cutDesc = 60;
        } else if (item.title.length < 60) {
            dots = "";
        }

        newTag.innerHTML = `
            <div class="clothBox">
                <img src="${item.image}" height="100px" class="prodImg">
                <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
                <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
                <h5 class="price">$${item.price}</h5>
            </div>
        `;


        clothBox.appendChild(newTag);
    }

});
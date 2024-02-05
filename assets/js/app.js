const url = 'https://fakestoreapi.com/products';
let searchUpInput = document.querySelector("#increaseInp");
let searchDownInput = document.querySelector("#decreaseInp");
let searchInput = document.querySelector("#searchInp");


let app = {
    data: null,
    sortD: null,
    search: "",
    doSearch(s) {
        this.search = s.toLowerCase();
        this.rememberSort();
        this.render();
    },
    doSort(direction) {
        this.sortD = direction;
        this.rememberSort();
        this.render();
    },
    async loadData() {
        let result = await fetch(url);
        this.data = await result.json();
        let savedSortDirection = localStorage.getItem("sortDirection");
        if (savedSortDirection) {
            this.sortD = savedSortDirection;

        }

        let savedSearch = localStorage.getItem("searchText");
        if (savedSearch){
            this.search = savedSearch;
            searchInput.value = savedSearch;
        }

        for (let p in this.data) {
            this.data[p].allText = String(this.data[p].title + this.data[p].description + this.data[p].price);
        }
        console.log(this.data);
        this.rememberSort();
        this.render();
    },
    rememberSort() {
        if (this.sortD != null) {
            localStorage.setItem("sortDirection", this.sortD);
        }

        localStorage.setItem("searchText", this.search);
    },
    render() {
        let searchResults = this.data.filter(item => item.allText.toLowerCase().includes(this.search));
        
        if (this.sortD == "up") {
            searchResults.sort((a, b) => a.price - b.price);
            searchUpInput.click();
        } else if (this.sortD == "down") {
            searchResults.sort((a, b) => b.price - a.price);
            searchDownInput.click();

        }

        let tbody = document.querySelector(".mainClothBox");
        tbody.innerHTML = searchResults.map(item => `
            <div class="clothBox">
                <img src="${item.image}" height="100px" class="prodImg">
                <h5 class="clothName">${item.title.slice(0, 60)}</h5>
                <p class="clothDesc">${item.description.slice(0, 100)}</p>
                <h5 class="price">$${item.price}</h5>
            </div>
        `).join("");
    }
}
app.loadData();

searchInput.addEventListener("input", () => app.doSearch(searchInput.value));

searchUpInput.addEventListener("click", () => app.doSort("up"));

searchDownInput.addEventListener("click", () =>  app.doSort("down"));

// const url = await fetch('https://fakestoreapi.com/products');
// const storeObj = await url.json();
// console.log(storeObj);

// let clothBox = document.querySelector(".mainClothBox");
// let searchInp = document.querySelector("#searchInp");

// let app = {
//     pricesNormalList: storeObj.map(prod => prod.price),
//     searchFunc: function(pList = false) {
//         let resultObj = storeObj.filter(item => item.title.toLowerCase().includes(searchInp.value.toLowerCase()));
//         let b;
//         if (pList != false) {
//             b = pList;
//             this.build(true, b, resultObj);
//         } else {
//             this.build(true, this.pricesNormalList, resultObj);
//         }

//     },

//     incOrdecFunc: function (inc, dec) {
//         let priceIncr = this.pricesNormalList.slice().sort((a, b) => a - b);
//         let priceDecr = priceIncr.slice().reverse();

//         if (inc == true) {
//             this.searchFunc(priceIncr);

//         } else if (dec == true) {
//             this.searchFunc(priceDecr);
//         }

//     },
//     build: function (isSort, needMas, isSearch = false) {
//         let mainObj;
//         if (isSearch == false) {
//             mainObj = storeObj;
//         } else {
//             mainObj = isSearch;
//         }
        
//         for (let prd in mainObj) {
//             let newTag = document.createElement("div");
//             let cutDesc = 100;
//             let dots = "...";
//             let item;

//             if (isSort == false) {
//                 item = mainObj[prd];
//             } else if (isSort == true) {
//                 item = mainObj[this.pricesNormalList.indexOf(needMas[prd])];
//                 console.log(item)
//             }

//             if (item.title.length > 60) {
//                 cutDesc = 60;
//             } else if (item.title.length < 60) {
//                 dots = "";
//             }

//             newTag.innerHTML = `
//                 <div class="clothBox">
//                     <img src="${item.image}" height="100px" class="prodImg">
//                     <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
//                     <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
//                     <h5 class="price">$${item.price}</h5>
//                 </div>
//             `;

//             clothBox.appendChild(newTag);
//         }
//     }
// }

// app.build(false, NaN);

// let incInp = document.querySelector("#increaseInp");
// let decrInp = document.querySelector("#decreaseInp");

// incInp.addEventListener("click", function () {
//     clothBox.innerHTML = "";
//     app.incOrdecFunc(true, false);
// });

// decrInp.addEventListener("click", function () {
//     clothBox.innerHTML = "";
//     app.incOrdecFunc(false, true);
// });

// searchInp.addEventListener("input", function() {
//     clothBox.innerHTML = "";
//     app.searchFunc(false);
    
// });

// for (let item of storeObj) {
//     let newTag = document.createElement("div");
//     let cutDesc = 100;
//     let dots = "...";

//     if (item.title.length > 60) {
//         cutDesc = 60;
//     } else if (item.title.length < 60) {
//         dots = "";
//     }

//     newTag.innerHTML = `
//         <div class="clothBox">
//             <img src="${item.image}" height="100px" class="prodImg">
//             <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
//             <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
//             <h5 class="price">$${item.price}</h5>
//         </div>
//     `;


//     clothBox.appendChild(newTag);
// }

// let pricesNormalList = [];
// for (let prod of storeObj) {
//     pricesNormalList.push(prod.price);
// }
// let priceIncr = pricesNormalList.slice().sort((a, b) => a - b);
// let priceDecr = priceIncr.slice().reverse();

// let incInp = document.querySelector("#increaseInp");
// let decrInp = document.querySelector("#decreaseInp");

// let reSortFunc = function (priceMas) {
//     for (let pr of priceMas) {
//         let newTag = document.createElement("div");
//         let cutDesc = 100;
//         let dots = "...";

//         let item = storeObj[pricesNormalList.indexOf(pr)];

//         if (item.title.length > 60) {
//             cutDesc = 60;
//         } else if (item.title.length < 60) {
//             dots = "";
//         }

//         newTag.innerHTML = `
//             <div class="clothBox">
//                 <img src="${item.image}" height="100px" class="prodImg">
//                 <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
//                 <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
//                 <h5 class="price">$${item.price}</h5>
//             </div>
//         `;


//         clothBox.appendChild(newTag);
//     }
// }
// incInp.addEventListener("click", function() {
//     clothBox.innerHTML = "";
//     reSortFunc(priceIncr);
// });

// decrInp.addEventListener("click", function() {
//     clothBox.innerHTML = "";
//     reSortFunc(priceDecr);
// });
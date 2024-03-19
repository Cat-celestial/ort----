import { createApp, reactive, ref, onMounted } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { render } from "vue";
const url = await fetch('https://fakestoreapi.com/products');
const prodsObj = await url.json();

let inrInp = document.getElementById("increaseInp");
let decrInp = document.getElementById("decreaseInp");

createApp({
    setup() {
        let stafVueObj = prodsObj.map(obj => ({ ...obj, allText: `${obj.title.toLowerCase()} ${obj.description.toLowerCase()}` }));
        let minPrice = ref(9);
        let maxPrice = ref(1000);
        let minPStorage = localStorage.getItem("minPrc");
        let maxPStorage = localStorage.getItem("maxPrc");
        if (minPStorage) { minPrice.value = minPStorage; } else { localStorage.setItem("minPrc", minPrice.value); }
        if (maxPStorage) { maxPrice.value = maxPStorage; } else { localStorage.setItem("maxPrc", maxPrice.value); }

        let sortDirect = ref("");
        let sortDStorage = localStorage.getItem("sortDrct");
        if (sortDStorage) {
            sortDirect.value = sortDStorage;
            if (sortDirect.value == "up") {
                inrInp.setAttribute('checked', 'checked');
            } else if (sortDirect.value == "down"){
                decrInp.setAttribute('checked', 'checked');
            }
        } else { localStorage.setItem("sortDrct", ""); }

        let searchValue = ref("");

        const render = () => {
            localStorage.setItem("minPrc", minPrice.value);
            localStorage.setItem("maxPrc", maxPrice.value);

            let clothBox = document.querySelector(".mainClothBox");
            clothBox.innerHTML = "";
            let sortedProds = stafVueObj.filter(obj => obj.allText.includes(searchValue.value.trim().toLowerCase()) && obj.price > minPrice.value && obj.price < maxPrice.value);

            if (sortDirect.value == "down") {
                sortedProds = sortedProds.sort((a, b) => b.price - a.price);
            } else if (sortDirect.value == "up") {
                sortedProds = sortedProds.sort((a, b) => a.price - b.price);
            }

            for (let item of sortedProds) {
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
        };

        onMounted(() => {
            render();
        });

        const increaseFunc = () => {
            sortDirect.value = "up";
            localStorage.setItem("sortDrct", "up");
            render();
        }

        const decreaseFunc = () => {
            sortDirect.value = "down";
            localStorage.setItem("sortDrct", "down");
            render();
        }

        return {
            stafVueObj,
            minPrice,
            maxPrice,
            sortDirect,
            searchValue,
            render,
            increaseFunc, decreaseFunc
        }
    }
}).mount("#app");


// import ProdsBlock from "./components/prodsBlock.js"

// createApp({
//     setup() {
//         // let objects = reactive([
//         //     { title: "Joy", lonely: true},
//         //     { title: "Jared", lonely: false},
//         //     { title: "Jenson", lonely: true},
//         //     { title: "Roy", lonely: true},
//         //     { title: "Kanie", lonely: true},
//         //     { title: "Woxy", lonely: true},
//         // ]);

//         let stafVueObj = reactive([]);

//         onMounted(async () => {
//             let data = await fetch(prodsUrl);
//             data = await data.json();
//             data = data.map(obj => ({ ...obj, allText: `${obj.title.toLowerCase()} ${obj.description.toLowerCase()}`, selectAmount: 0 }))
//             stafVueObj.push(...data);
//             console.log(stafVueObj);
//             render();
//         });


//         let minPrice = ref(9);
//         let maxPrice = ref(1000);
//         let minPStorage = localStorage.getItem("minPrc");
//         let maxPStorage = localStorage.getItem("maxPrc");
//         if (minPStorage) { minPrice.value = minPStorage; } else { localStorage.setItem("minPrc", minPrice.value); }
//         if (maxPStorage) { maxPrice.value = maxPStorage; } else { localStorage.setItem("maxPrc", maxPrice.value); }

//         // // сохранение статуса сортировки в local storage
//         let sortDirect = ref("");
//         let sortDStorage = localStorage.getItem("sortDrct");
//         if (sortDStorage) {
//             sortDirect.value = sortDStorage;
//             if (sortDirect.value == "up") {
//                 inrInp.setAttribute('checked', 'checked');
//             } else if (sortDirect.value == "down") {
//                 decrInp.setAttribute('checked', 'checked');
//             }
//         } else { localStorage.setItem("sortDrct", ""); }

//         let searchValue = ref("");

        // const minMaxSave = () => {
        //     localStorage.setItem("minPrc", minPrice.value);
        //     localStorage.setItem("maxPrc", maxPrice.value);
        //     stafVueObj = reactive(stafVueObj.filter(obj => obj.id < 10));
        //     console.log(stafVueObj);

        // objects.sort((a, b) => (a.lonely == false ? -1 : 1))
        // obj.allText.includes(searchValue.value.trim().toLowerCase()) && obj.price > minPrice.value && obj.price < maxPrice.value

        //     if (sortDirect.value == "down") {
        //         stafVueObj.sort((a, b) => b.price - a.price);
        //     } else if (sortDirect.value == "up") {
        //         stafVueObj.sort((a, b) => a.price - b.price);
        //     }
        // }

        // const objectFilter = () => {
        //     objects.value = objects.filter(obj => obj.bName.includes("y"));

        // }

        // const render = () => {

        //     localStorage.setItem("minPrc", minPrice.value);
        //     localStorage.setItem("maxPrc", maxPrice.value);

        //     stafVueObj = stafVueObj.filter(obj => obj.allText.includes(searchValue.value.trim().toLowerCase()) && obj.price > minPrice.value && obj.price < maxPrice.value);

            // if (sortDirect.value == "down") {
            //     stafVueObj.sort((a, b) => b.price - a.price);
            // } else if (sortDirect.value == "up") {
            //     stafVueObj.sort((a, b) => a.price - b.price);
            // }


        // ВАРИАНТ РУЧНОГО ОБНОВЛЕНИЯ
        // clothBox.innerHTML = `
        //     <prods-block
        //         v-for="prod in ${stafVueObj}"
        //         :prods-info="prod"
        //     ></prods-block>
        // `

//         const render = () => {
//             localStorage.setItem("minPrc", minPrice.value);
//             localStorage.setItem("maxPrc", maxPrice.value);
            
//             let clothBox = document.querySelector(".mainClothBox");
//             clothBox.innerHTML = "";

//             stafVueObj = stafVueObj.filter(obj => obj.allText.includes(searchValue.value.trim().toLowerCase()) && obj.price > minPrice.value && obj.price < maxPrice.value);
//             if (sortDirect.value == "down") {
//                 stafVueObj.sort((a, b) => b.price - a.price);
//             } else if (sortDirect.value == "up") {
//                 stafVueObj.sort((a, b) => a.price - b.price);
//             }

//             for (let item of stafVueObj) {
//                 let newTag = document.createElement("div");
//                 let cutDesc = 100;
//                 let dots = "...";

//                 if (item.title.length > 60) {
//                     cutDesc = 60;
//                 } else if (item.title.length < 60) {
//                     dots = "";
//                 }

//                 newTag.innerHTML = `
//                     <div class="clothBox">
//                         <img src="${item.image}" height="100px" class="prodImg">
//                         <h5 class="clothName">${item.title.slice(0, 60) + dots}</h5>
//                         <p class="clothDesc">${item.description.slice(0, cutDesc) + "..."}</p>
//                         <h5 class="price">$${item.price}</h5>
//                         <prods-block></prods-block>

//                         <div class="prodAmountBox">
//                             <button class="changeAmProdBut">-1</button>
//                             <p class="currProdAm">0</p> 
//                             <button class="changeAmProdBut">+1</button>
//                         </div>
//                     </div>
//                 `;


//                 clothBox.appendChild(newTag);
//             }
//         };

//         const increaseFunc = () => {
//             sortDirect.value = "up";
//             localStorage.setItem("sortDrct", "up");
//             render();
//         }

//         const decreaseFunc = () => {
//             sortDirect.value = "down";
//             localStorage.setItem("sortDrct", "down");
//             render();
//         }

//         return {
//             stafVueObj,
//             minPrice,
//             maxPrice,
//             sortDirect,
//             searchValue,
//             render,
//             increaseFunc, decreaseFunc,
//             // minMaxSave,

//             // objectFilter,
//             // objects
//         }
//     }
// }).mount("#app");

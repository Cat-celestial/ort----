import { createApp, reactive, ref, onMounted } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
let prodsUrl = 'https://fakestoreapi.com/products';
let inrInp = document.getElementById("increaseInp");
let decrInp = document.getElementById("decreaseInp");

import ProdsBlock from "./components/prodsBlock.js"

createApp({
    setup() {
        // let objects = reactive([
        //     { bName: "Joy", lonely: true},
        //     { bName: "Jared", lonely: false},
        //     { bName: "Jenson", lonely: true},
        //     { bName: "Roy", lonely: true},
        //     { bName: "Kanie", lonely: true},
        //     { bName: "Woxy", lonely: true},
        // ]);
        
        let stafVueObj = reactive([]);

        onMounted(async () => {
            let data = await fetch(prodsUrl);
            data = await data.json();
            console.log(data);
            stafVueObj.push(...data.map(obj => ({ ...obj, allText: `${obj.title.toLowerCase()} ${obj.description.toLowerCase()}`, selectAmount: 0 })));
        });
        
        console.log(stafVueObj);

        let minPrice = ref(9);
        let maxPrice = ref(1000);
        let minPStorage = localStorage.getItem("minPrc");
        let maxPStorage = localStorage.getItem("maxPrc");
        if (minPStorage) { minPrice.value = minPStorage; } else { localStorage.setItem("minPrc", minPrice.value); }
        if (maxPStorage) { maxPrice.value = maxPStorage; } else { localStorage.setItem("maxPrc", maxPrice.value); }

        // сохранение статуса сортировки в local storage
        let sortDirect = ref("");
        let sortDStorage = localStorage.getItem("sortDrct");
        if (sortDStorage) {
            sortDirect.value = sortDStorage;
            if (sortDirect.value == "up") {
                inrInp.setAttribute('checked', 'checked');
            } else if (sortDirect.value == "down") {
                decrInp.setAttribute('checked', 'checked');
            }
        } else { localStorage.setItem("sortDrct", ""); }

        let searchValue = ref("");

        // const objectFilter = () => {
        //     objects.value = objects.filter(obj => obj.bName.includes("y"));

        // }

        const render = () => {

            localStorage.setItem("minPrc", minPrice.value);
            localStorage.setItem("maxPrc", maxPrice.value);

            stafVueObj = stafVueObj.filter(obj => obj.allText.includes(searchValue.value.trim().toLowerCase()) && obj.price > minPrice.value && obj.price < maxPrice.value);

            if (sortDirect.value == "down") {
                stafVueObj.sort((a, b) => b.price - a.price);
            } else if (sortDirect.value == "up") {
                stafVueObj.sort((a, b) => a.price - b.price);
            }


            // ВАРИАНТ РУЧНОГО ОБНОВЛЕНИЯ
            // clothBox.innerHTML = `
            //     <prods-block
            //         v-for="prod in ${stafVueObj}"
            //         :prods-info="prod"
            //     ></prods-block>
            // `

            // СТАРЫЙ ВАРИАНТ
            // for (let item of sortedProds) {
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
            //             <prods-block></prods-block>
            //         </div>
            //     `;


            //     clothBox.appendChild(newTag);
            // }
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

            // objectFilter,
            // objects
        }
    },
    components: {
        ProdsBlock
    }
}).mount("#app");

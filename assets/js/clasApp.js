const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

import { createApp, ref, reactive, onMounted, computed } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
    setup() {
        const appTitle = ref("NBU app title");
        const search = ref("");
        const sort = ref("");

        const rates = reactive([]);

        onMounted(async () => {
            let data = await fetch(url);
            data = await data.json();
            rates.push(...data);
        });

        const ratesToShow = computed(() => {
            let s = search.value.toLowerCase().trim();
            let result = rates.filter(rate => rate.txt.toLowerCase().includes(s));

            if (sort.value == "up") {
                result.sort((a, b) => a.rate - b.rate);
            } else if (sort.value == "down") {
                result.sort((a, b) => b.rate - a.rate);
            }

            return result;
        });

        return {
            appTitle,
            rates,
            search,
            ratesToShow,
            sort
        }
    }
}).mount("#app");


// import { createApp, ref, reactive, onMounted, computed } from "vue";

// createApp({
//     setup() {
//         const appTitle = ref("Vue + NPM Demo App");

//         const listP = reactive([
//             { title: "Cofee", price: 5, selected: false },
//             { title: "Tea", price: 3, selected: false },
//             { title: "Jam", price: 9, selected: false },
//             { title: "Yogurt", price: 4, selected: false },
//             { title: "Lime", price: 1.5, selected: false },
//         ]);

//         const totalCost = computed(() => listP
//             .filter(item => item.selected)
//             .reduce((acc, item) => acc + item.price, 0)
//         );

//         return {
//             appTitle,
//             listP,
//             totalCost
//         }
//     }
// }).mount("#app");
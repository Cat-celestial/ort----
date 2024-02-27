import { createApp, ref, reactive, onMounted } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const apiUrl = "https://restcountries.com/v3.1/all";

const storage = {};

createApp({
    setup() {
        const appTitle = ref("Oh sheet, here we vue again");

        const countries = reactive([]);

        onMounted(async () => {
            let data = await fetch(apiUrl);
            data = await data.json();
            console.log(data);
        });

        return {
            appTitle, 
            countries
        }
    }

})
import { computed } from "vue";

export default {
    props: ["prodsInfo"],
    setup(props) {
        return {
            props
        }
    },
    template: `
        <div class="clothBox">
            <img :src="props.prodsInfo.image" height="100px" class="prodImg">
            <h5 class="clothName">{{props.prodsInfo.title.slice(0, 60) + "..."}}</h5>
            <p class="clothDesc">{{props.prodsInfo.description.slice(0, 100) + "..."}}</p>
            <h5 class="price">&#36;{{props.prodsInfo.price}}</h5>
        
            <div class="prodAmountBox">
                <button class="changeAmProdBut">-1</button>
                <p class="currProdAm">0</p> 
                <button class="changeAmProdBut">+1</button>
            </div>
        </div>
    `
}
// <p> Name: {{props.prodsInfo.bName}} Lonely: {{props.prodsInfo.lonely}}</p>
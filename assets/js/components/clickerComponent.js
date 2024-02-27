import { ref } from "vue";

const ClickerComponent = {
    props: ["counterTitle", "startValue"],
    emits: ["counterIncrease"],
    setup(props, context) {
        const counter = ref(props.startValue);
        const inc = () => {
            counter.value++;
            context.emit("counterIncrease", `${counterTitle} quantity is ${counter.value}`);
        };

        return {
            counter,
            inc,
            props
        }

    },
    template: `
        <button @click="inc" class='btn btn-success'>{{props.counterTitle}}: {{counter}}</button>
    `
};

export default ClickerComponent;
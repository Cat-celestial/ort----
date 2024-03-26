<script setup>

    const props = defineProps({
        product: Object
    });

    const emit = defineEmits(['quantityUp', 'quantityDown'])

    const inc = () => emit('quantityUp', props.product);
    const dec = () => emit('quantityDown', props.product);    

</script>

<template>
    <div class="p-1 mb-3">
        <div class="card p-1 border-0">
        <img :src="product.image" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <h6>${{ product.price }}</h6>
            <p class="card-text">{{ product.description.slice(0, 60) }}...</p>
            <div class="d-flex align-items-center justify-content-between">
            <button class="btn btn-primary" @click="dec">-1</button>
            <span>{{ product.quantity }}</span>
            <button class="btn btn-primary" @click="inc">+1</button>
            </div>
        </div>
        </div>
    </div> 
</template>

<style scoped>
  img {
    max-height: 120px;
    object-fit: contain;
  }
</style>
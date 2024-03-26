<script setup>

const url = 'https://fakestoreapi.com/products';

import { reactive, ref, onMounted, computed } from 'vue';

import OneProduct from './components/HelloWorld.vue';

const products = reactive([]);

onMounted(async () => {
  let data = await fetch(url);
  data = await data.json();
  for (let item of data) {
    item.quantity = 0;
  }
  console.log(data);
  products.push(...data);
});

const search = ref('');

const sort = ref('');

const min = ref(0);

const max = ref(1000);

const totalQuantity = computed(() => products.reduce((acc, item) => acc + item.quantity, 0));
const totalCost = computed(() => products.reduce((acc, item) => acc + item.quantity * item.price, 0));

const productsToShow = computed(() => {
  let s = search.value.toLowerCase();
  let results = products.filter(item =>
    item.title.toLowerCase().includes(s) ||
    item.description.toLowerCase().includes(s)
  );

  results = results.filter(item => item.price >= min.value && item.price <= max.value);

  if (sort.value == 'up') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort.value == 'down') {
    results.sort((a, b) => b.price - a.price);
  }

  return results;
});

const qtUp = (product) => {
  product.quantity++;
}

const qtDown = (product) => {
  if (product.quantity > 0) {
    product.quantity--;
  }
}

</script>

<template>
  <div class="container" id="grid">
    <header class="d-flex align-items-center justify-content-between">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Shop App</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
      <h4 class="mb-0">
        <span class="px-2">({{ totalQuantity }})</span>
        <span>${{ totalCost.toFixed(2) }}</span>
      </h4>
    </header>
    <main>
      <div class="row row-cols-4">
        <OneProduct v-for="item in productsToShow" :product="item" @quantity-up="qtUp" @quantity-down="qtDown" />
      </div>
    </main>
    <aside>
      <h4>Options</h4>
      <div class="py-2">
        <input class="form-control" type="text" placeholder="Search" v-model="search">
      </div>
      <div class="py-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sortDirection" id="sortUp" v-model="sort" value="up">
          <label class="form-check-label" for="sortUp">
            Price Up
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="sortDirection" id="sortDown" v-model="sort" value="down">
          <label class="form-check-label" for="sortDown">
            Price Down
          </label>
        </div>
      </div>
      <div class="py-2">
        <label for="minPrice" class="form-label">Min Price: ${{ min }}</label>
        <input min="0" max="1000" type="range" class="form-range" id="minPrice" v-model="min">
        <label for="maxPrice" class="form-label">Max Price: ${{ max }}</label>
        <input min="0" max="1000" type="range" class="form-range" id="maxPrice" v-model="max">
      </div>
    </aside>
    <footer>
      <h4 class="text-center">Copyright &copy; 2024</h4>
    </footer>
  </div>
</template>

<style scoped>
header {
  grid-area: header;
}

main {
  grid-area: main
}

aside {
  grid-area: aside;
}

footer {
  grid-area: footer;
}

#grid {
  min-height: 100vh;
  display: grid;
  gap: 14px;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header header"
    "main   aside"
    "footer footer";
}
</style>

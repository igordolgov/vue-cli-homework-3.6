<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  // eslint-disable-next-line vue/require-prop-types
  props: ['products'],
};
</script>

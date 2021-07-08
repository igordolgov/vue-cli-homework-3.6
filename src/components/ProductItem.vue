<template>
  <!-- Шаблон компонента (отдельно от JavaScript) -->
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
    >
      <!-- далее подключаем картинку товара и с помощью директивы
      v-bind (сокращённо :) связываем её src и alt с товаром -->
      <img
        :src="product.image"
        :alt="product.title"
      >
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }} <!-- С помощью интерполяции выводим название товара -->
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} &#8381; <!-- С помощью интерполяции выводим цену товара -->
    </span>

    <ul class="colors colors--black">
      <li
        class="colors__item"
        v-for="productColor in product.colors"
        :key="productColor.id"
      >
        <label
          class="colors__label"
        >
          <input
            class="colors__radio sr-only"
            type="radio"
            value="productColor.colors"
            v-model="product.colors"
          >
          <span
            class="colors__value"
            :style="{'background-color': productColor,
                     'border': '1px solid grey'}"
          />
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['product', 'productColor'], // props - это входные параметры
};
</script>

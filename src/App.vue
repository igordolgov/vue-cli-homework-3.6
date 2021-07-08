<template>
  <!-- Шаблон компонента (отдельно от JavaScript) -->
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <!-- Подключаем компонент ProductFilter.
      Про использование модификатора ".sync" см. в файле ProductFilter.vue-->
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :colors-id.sync="filterColorsId"
      />

      <section class="catalog">
        <!-- Подключаем компонент ProductList и передаем ему параметр products,
        который равен массиву products, хранящемуся в состоянии data (в computed) -->
        <ProductList :products="products" />
        <!-- Подключаем компонент BasePagination. Параметры ("per-page") вызываются
        в cebab-case, хотя в самом компоненте они записаны в camelCase -->
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script> // Секция скриптов
// Импортируем файлы и компоненты, которые понадобятся в этом файле:
import products from './data/products'; // импортируем данные в переменную products
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter }, // Подключаемые компоненты
  // Так как Ключ (тэг в шаблоне) и Значение (сам Компонент) совпадают по названию,
  // используется сокращённая запись (одним словом)
  data() { // Состояние (В компоненте состояние должно быть функцией, а не объектом).
  // Если значения этих свойств изменятся, компонент перерисуется
    return {
      filterPriceFrom: 0, // Начальная цена в фильтре (по умолчанию)
      filterPriceTo: 0, // Конечная цена в фильтре (по умолчанию)
      filterCategoryId: 0, // Категория по умолчанию ("Все категории")
      filterColorsId: '',
      page: 1, // Текущая страница (по умолчанию первая)
      productsPerPage: 6, // Товаров на странице
    };
  },
  computed: { // Вычисляемые свойства:
  // Вычисляемые свойства - свойства, значения которых получаются динамически, с помощью
  // функций, а результаты кэшируются до тех пор, пока зависимые свойства не будут изменены
  // (чтобы не пересчитывать каждый раз заново, если они не изменяются)
  // Внутри вычисляемых свойств могут быть другие вычисляемые свойства, пропсы...
    filteredProducts() { // Функция фильтрации товаров
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) { // Если в поле "От" введена цена (т.е. больше нуля),
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom); // Показать только
        // те товары, цена которых больше указанной в этом поле
      }

      if (this.filterPriceTo > 0) { // Если в поле "До" введена цена (т.е. больше нуля),
        filteredProducts = filteredProducts
          .filter((product) => product.price < this.filterPriceTo); // Показать только
        // те товары, цена которых меньше указанной в этом поле
      }

      if (this.filterCategoryId) { // Если в поле "Категории" выбрана категория,
        filteredProducts = filteredProducts
          .filter((product) => product.categoryId === this.filterCategoryId); // Показать
        // только те товары, у которых категоря соответствует выбранной категории
      }

      if (this.filterColorsId) {
        filteredProducts = filteredProducts
          .filter((product) => product.colors === this.filterColorsId);
        // TODO перебрать product.colors чтобы вывести цвета каждого продукта
      }

      return filteredProducts;
    },
    products() { // Список товаров на странице (после настроек пагинации)
      const offset = (this.page - 1) * this.productsPerPage; // Начальный индекс
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() { // Общее количество товаров
      return this.filteredProducts.length;
    },
  },
};
</script>

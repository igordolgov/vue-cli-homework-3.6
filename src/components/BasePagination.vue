<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': page === 1}"
        aria-label="Предыдущая страница"
        href="#"
        @click.prevent="prevPage()"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>
    <!-- Отобразим нумерацию на странице. Жирным шрифтом (класс
    'pagination__link--current) отображается только текущая страница (т.е.
    при условии, что номер страницы совпадает с номером текущей страницы)-->
    <li
      class="pagination__item"
      v-for="pageNumber in pages"
      :key="pageNumber"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current': pageNumber === page}"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': page === pages}"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="nextPage()"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: { // Входящие параметры комплнента:
    page: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 0,
    },
  },
  computed: { // Вычисляемые функции компонента:
    pages() { // Вычисляем количество страниц: общее количество товаров
    // разделим на количество элементов на странице (и округлим в большую сторону)
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    prevPage() { // Предыдущая страница
      if (this.page === 1) {
        this.$emit('paginate', (this.page));
      } else {
        this.$emit('paginate', (this.page - 1));
      }
    },
    nextPage() { // Следующая страница
      if (this.page >= (this.count / this.perPage)) {
        this.$emit('paginate', (this.page));
      } else {
        this.$emit('paginate', (this.page + 1));
      }
    },
  },
};
</script>

<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
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
  props: {
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
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    prevPage() {
      this.$emit('paginate', (this.page - 1));
    },
    nextPage() {
      this.$emit('paginate', (this.page + 1));
    },
  },
};
</script>

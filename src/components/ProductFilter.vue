<template>
  <!-- Шаблон компонента (отдельно от JavaScript) -->
  <aside class="filter">
    <h2
      class="filter__title"
    >
      Фильтры
    </h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend
          class="form__legend"
        >
          Цена
        </legend>
        <label class="form__label form__label--price">
          <!-- Через v-model привязываем пропсы к полям ввода.
          С помощью модификатора .number значения конвертируются в числа -->
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          >
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend
          class="form__legend"
        >
          Категория
        </legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend
          class="form__legend"
        >
          Цвет
        </legend>
        <ul class="colors">
          <li
            class="colors__item"
            v-for="color in colors"
            :key="color.id"
          >
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                :value="color.code"
                checked=""
                v-model="currentColorsId"
              >
              <span
                class="colors__value"
                :style="{'background-color':color.code}"
              />
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend
          class="form__legend"
        >
          Объем в ГБ
        </legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              >
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="16"
              >
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="32"
              >
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="64"
              >
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="128"
              >
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="264"
              >
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
// Импортируем данные из файлов в новые переменные
import categories from '../data/categories';
import colors from '../data/colorsId';

export default {
  data() { // СОСТОЯНИЕ (В компоненте состояние должно быть функцией, а не объектом).
  // Если значения этих свойств изменятся, компонент перерисуется
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorsId: '',
    };
  },
  props: { // ВХОДНЫЕ ПАРАМЕТРЫ (их нужно привязать с помощью v-model):
    priceFrom: {
      type: Number,
      default: 0,
    },
    priceTo: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Number,
      default: 0,
    },
    colorsId: {
      type: String,
      default: '',
    },
  },
  computed: { // Методы, которые каждый раз пересчитываются
    categories() {
      return categories;
    },
    colors() {
      return colors;
    },
  },
  watch: { // НАБЛЮДАТЕЛЬ (механизм, который следит за свойством или параметром, и как
  // только значение этого свойства меняется, вызывается определённая нами функция).
    priceFrom(value) { // Как только priceFrom изменится, мы изменим текущее значение,
    // которое хранится в состоянии. В качестве значения используем первый аргумент,
    // который приходит в эту функцию (новое значение, которое изменилось)
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorsId(value) {
      this.currentColorsId = value;
    },
  },
  methods: { // Методы, используемые только для действий (без пересчёта)
    submit() { // Функция обработки событий при нажатии на кнопку "Применить".
      // $emit - метод для отправки событий (для двунаправленной связи).
      // У него два агрумента: первый - название события (в "cebab-case")
      // и второй - любые данные, передаваемые вместе с событием
      // (чтобы их вывести, используется переменная $event),
      // например: @priceFrom="alert($event)"
      this.$emit('update:priceFrom', this.currentPriceFrom); // Говорим, что
      // изменилось поле priceFrom, а в качестве значения будет значение из состояния
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorsId', this.currentColorsId);
    },
    reset() { // Обработка событий при нажатии на кнопку "Сбросить".
      // Если мы записываем название события с "update:", мы можем воспользоваться
      // модификатором для v-bind ".sync", который будет отлавливать это событие и
      // передавать ему свойство, которое мы указываем в v-bind (см. в App.vue)
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorsId', '');
    },
  },
};
</script>

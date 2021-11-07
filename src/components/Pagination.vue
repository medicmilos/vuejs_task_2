<template>
  <div class="pagination">
    <span
      v-for="item in paginationItems"
      :key="item.id"
      :class="item.class"
      @click="changeCurrentPage(item.actionValue)"
    >
      {{ item.value }}
    </span>

    <button
      class="pagination-button"
      @click="goTo('goPrev')"
      :disabled="currentPage == minPageNum"
    >
      <span>&lt;</span>
    </button>
    <button
      class="pagination-button"
      @click="goTo('goNext')"
      :disabled="currentPage == maxPageNum"
    >
      <span>&gt;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: { currentPage: Number, minPageNum: Number, maxPageNum: Number },
  data() {
    return {
      items: []
    }
  },
  computed: {
    paginationItems() {
      return this.items.filter(item => item.show)
    }
  },
  watch: {
    currentPage() {
      this.initPagination()
    }
  },
  created() {
    this.initPagination()
  },
  methods: {
    goTo(to) {
      this.$emit(to)
    },
    changeCurrentPage(num) {
      if (num !== null) {
        this.$emit("changeCurrentPage", num)
      }
    },
    initPagination() {
      const activeClass = "active"
      const dotsClass = "dots"

      this.items = [
        {
          id: 1,
          show: true,
          class: this.currentPage == this.minPageNum ? activeClass : "",
          value: this.minPageNum,
          actionValue: this.minPageNum
        },
        {
          id: 2,
          show: true,
          class: this.currentPage == this.minPageNum + 1 ? activeClass : "",
          value: this.minPageNum + 1,
          actionValue: this.minPageNum + 1
        },
        {
          id: 3,
          show: this.currentPage > this.minPageNum + 1,
          class: dotsClass,
          value: "...",
          actionValue: null
        },
        {
          id: 4,
          show:
            this.currentPage > this.minPageNum + 1 &&
            this.currentPage < this.maxPageNum - 1,
          class: activeClass,
          value: this.currentPage,
          actionValue: null
        },
        {
          id: 5,
          show: this.currentPage < this.maxPageNum - 1,
          class: dotsClass,
          value: "...",
          actionValue: null
        },
        {
          id: 6,
          show: true,
          class: this.currentPage == this.maxPageNum - 1 ? activeClass : "",
          value: this.maxPageNum - 1,
          actionValue: this.maxPageNum - 1
        },
        {
          id: 7,
          show: true,
          class: this.currentPage == this.maxPageNum ? activeClass : "",
          value: this.maxPageNum,
          actionValue: this.maxPageNum
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  .pagination-button {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 1px solid #d6d8da;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: #fff;
    span {
      margin: 0;
      vertical-align: middle;
      color: #797c80;
    }
    &[disabled] {
      opacity: 0.5;
    }
  }
}
</style>

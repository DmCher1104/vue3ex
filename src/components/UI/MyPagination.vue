<template>
  <div class="page__wrapper">
    <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
            'current-page': currentPage === pageNumber,
          }"
        @click="this.$emit('changePage', pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    totalPages: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
  padding: 0 20px;
  justify-content: flex-end;
}

.page {
  border: 1px solid black;
  padding: 10px;
  align-items: center;
}

.current-page {
  margin: 0 2px;
  border: 3px solid teal;
}
</style>
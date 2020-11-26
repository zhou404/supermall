<template>
  <div class="goods-list">
      <goo-list-item v-for="item in goodsList" :goodsListItem="item"></goo-list-item>
  </div>
</template>

<script>
import GooListItem from "@/components/content/goods/GoodListItem";
export default {
  name: "Goods",
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GooListItem
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>

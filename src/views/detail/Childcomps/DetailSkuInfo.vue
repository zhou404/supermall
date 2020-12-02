<template>
  <div class="detail-sku-info">
    <good-list :goodsList="goodsSkusInfo"></good-list>
  </div>
</template>

<script>
//导入GoodsList组件
import GoodList from "@/components/content/goods/GoodList";
//导入GoodslistItem组件
import GoodListItem from "@/components/content/goods/GoodListItem";
export default {
  props: {
    goodsSkusInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  name: "DetailSkuInfo",
  components: {
    GoodList,
    GoodListItem
  }
}
</script>

<style scoped>

</style>

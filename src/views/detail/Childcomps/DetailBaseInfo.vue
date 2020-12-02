<template>
  <div v-if="Object.keys(goods).length != 0" class="detail-base-info">
    <div class="base-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="base-price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount" :style="{backgroundColor: goods.discountBgColor}">{{goods.discount}}</span>
    </div>
    <div class="base-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="base-service">
      <span class="base-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img v-if="goods.services[index-1].icon" :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  name: "DetailBaseInfo"
}
</script>

<style scoped>
.base-title {
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}
.base-price {
  padding: 10px;
}
.newPrice {
  color: #ff8198;
  font-size: 21px;
}
.oldPrice {
  color: darkgray;
  text-decoration: line-through;
  font-size: 14px;
  margin-left: 5px;
}
.discount {
  font-size: 13px;
  padding: 1px 6px;
  border-radius: 10px;
  color: #eeeeee;
  margin-left: 5px;
}
.base-other {
  padding: 10px 5px;
  font-size: 10px;
  color: darkgray;
  display: flex;
  text-align: center;
}
.base-other span {
  padding-bottom: 7px;
  flex: 1;
  border-bottom: 1px solid rgba(100,100,100,0.1);
}
.base-service {
  display: flex;
  text-align: center;
}
.base-service-item {
  flex: 1;
}
.base-service-item img {
  width: 10px;
  height: 10px;
}
.base-service-item span {
  font-size: 10px;
}
</style>

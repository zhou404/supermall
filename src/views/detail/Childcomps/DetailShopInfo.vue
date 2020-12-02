<template>
  <div class="detail-shop-info">
    <div class="shop-title">
      <div class="shop-logo">
        <img :src="shop.logo" alt="">
      </div>
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-other">
      <div class="shop-fans">
        <span class="shop-num">{{shop.fans}}</span>
        <br>
        <span class="shop-text">总销量</span>
      </div>
      <div class="shop-sells">
        <span class="shop-num">{{shop.sells}}</span>
        <br>
        <span class="shop-text">全部宝贝</span>
      </div>
      <span class="fenge"></span>
      <div class="shop-score">
        <div class="shop-score-item" v-for="(item, index) in shop.score" :key="index">
          <span class="shop-text">{{item.name}}</span>
          <span class="shop-score-num" :class="{'score-better': item.isBetter}">{{item.score}}</span>
          <span class="shop-score-text" :class="{'better-more': item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
        </div>
      </div>
    </div>
    <div class="shop-into">
      <a :href="shop.shopUrl">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  name: "DetailShopInfo"
}
</script>

<style scoped>
.shop-title {
  padding: 20px 5px;
  display: flex;
}
.shop-logo {
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #666666;
  width: 45px;
  height: 45px;
  display: inline-block;
}
.shop-logo img {
  width: 100%;
  height: 100%;
}
.shop-title span {
  margin-left: 10px;
  align-self: center;
}
.shop-other {
  display: flex;
  text-align: center;
}
.shop-fans,.shop-sells {
  flex: 1;
}
.shop-score {
  flex: 2;
}
.shop-num {
  font-size: 16px;
  font-weight: bold;
}
.shop-text {
  font-size: 10px;
  font-weight: bold;
}
.fenge {
  margin-right: 10px;
  border-left: 1px solid rgba(100,100,100,0.2);
}
.shop-fans,.shop-sells,.shop-score {
  align-self: center;
}
.shop-score {
  padding-right: 20px;
}
.shop-score-item {
  display: flex;
  align-items: center;
  padding: 3px 0;
}
.shop-score-num {
  font-size: 14px;
  color: green;
  flex: 1;
}
.shop-score-text {
  background-color: green;
  color: #ffffff;
  font-size: 14px;

}
.score-better {
  color: red;
}
.better-more {
  background-color: red;
}
.shop-into {
  background-color: rgba(100,100,255,0.1);
  width: 100px;
  height: 25px;
  line-height: 25px;
  border-radius: 8px;
  text-align: center;
  margin: 20px auto;
  font-size: 14px;
}
.detail-shop-info {
  border-bottom: 5px solid rgba(100,100,100,0.1);
}
</style>

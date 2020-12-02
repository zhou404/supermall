<template>
  <div class="detail-goods-rate">
    <div class="rate-title">
      <span>用户评价</span>
      <span class="rate-title-more">更多</span>
    </div>
    <div class="rate-user" v-for="item in goodsRate.list">
      <div class="user-title">
        <img :src="item.user.avatar" alt="">
        <span>{{item.user.uname}}</span>
      </div>
      <div class="rate-label" v-if="item.extraInfo,length !== 0" v-for="label in item.extraInfo">
        <span>{{label}}</span>
      </div>
      <div class="user-rate">
        <span class="goods-content">{{item.content}}</span>
        <img v-if="item.images.length !== 0" :src="image" alt="" v-for="image in item.images">
        <div class="goods-style">
          <span>{{item.style}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsRate: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  name: "DetailGoodsRate"
}
</script>

<style scoped>
.detail-goods-rate {
  padding: 20px;
  position: relative;
  border-bottom: 5px solid rgba(100,100,100,.1);
}
.rate-title {
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100,100,100,0.2);
  font-size: 14px;
  display: flex;
}
.rate-title-more {
  text-align: right;
  flex: 1;
}
.user-title {
  padding: 10px 0;
  font-size: 14px;
}
.user-title img {
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
}
.user-title span {
  display: inline-block;
  margin-left: 10px;
}
.user-rate {
  padding: 10px 0;
  font-size: 10px;
}
.goods-content {
  line-height: 15px;
  display: block;
}
.goods-style {
  padding-top: 10px;
  color: darkgray;
}
.rate-label {
  font-size: 10px;
  margin: 10px 5px;
}
.rate-label span {
  background-color: #E8E8E8;
  padding: 2px 5px;
  border-radius: 5px;
}
.user-rate img {
  width: 100px;
  margin: 10px 5px;
  border-radius: 5px;
}
</style>

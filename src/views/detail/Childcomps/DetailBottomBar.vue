<template>
  <div class="detail-bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>
.detail-bottom-bar {
  height: 45px;
  position: relative;
  background-color: #ffffff;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
}

.bar-item {
  display: flex;
}

.bar-item > div {
  flex: 1;
}
.bar-left {
  padding-top: 5px;
}

.icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-image: url("../../../assets/img/detail/detail_bottom.png");
  background-size: 20px;
}

.text {
  display: block;
  font-size: 12px;
}

.service {
  background-position: 0px 89px;
}

.shop {
  background-position: 0px 48px;
}

.cart {
  background-color: yellow;
  font-size: 14px;
}
.bar-right {
  line-height: 45px;
}
.buy {
  background-color: #ff8198;
}
</style>

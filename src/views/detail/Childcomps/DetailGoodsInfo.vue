<template>
  <div class="detail-goods-info">
    <div class="detail-info-text">
      <div class="start">
        <div class="dian"></div>
        <span class="xian">_____________</span>
      </div>
      <div class="goods-desc">
        <span>{{detailGoodsInfo.desc}}</span>
      </div>
      <div class="end">
        <span class="xian">_____________</span>
        <div class="dian"></div>
      </div>
    </div>
    <div class="goods-images">
      <div class="goods-images-item">
        <div v-for="item in detailGoodsInfo.detailImage">
          <span class="goods-key">{{item.key}}</span>
          <img class="image" :src="image" alt="" v-for="image in item.list" @load="imageLoad">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailGoodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  name: "DetailGoodsInfo",
  methods: {
    imageLoad() {
      // 判断是否所有的图片都加载完了，直接在最后一次加载完，回调一次就行了
      if (++this.counter === this.imagesLength) {
        this.$emit('imageload')
      }
    }
  },
  watch: {
    detailGoodsInfo() {
      // 实时判断图片的长度，和上面的 counter 进行判断
      this.imagesLength = this.detailGoodsInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.detail-info-text {
  padding: 10px;
}
.image {
  width: 100%
}
.dian {
  width: 6px;
  height: 6px;
  background-color: #000000;
  display: inline-block;
  margin-bottom: -3px;
}
.end {
  text-align: right;
}
.goods-desc {
  font-size: 14px;
  padding: 10px 5px 0 5px;
}
.goods-key {
  padding: 10px;
  font-weight: bold;
}
</style>

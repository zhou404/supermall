<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in TopImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
//导入Swiper和SwiperItem组件
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  props: {
    TopImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>

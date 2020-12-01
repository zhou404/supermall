<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="ImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//轮播图组件导入
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    ImageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
      }
    }
  }
}
</script>

<style scoped>

</style>

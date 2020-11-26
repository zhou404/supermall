<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物街</div>
    </nav-bar>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata} from "@/network/home";
//轮播图组件导入
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'Home',
  components: {
    NavBar,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
//  生命周期函数，在Home组件创建时就请求数据
  created() {
  //  1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: #ff8198;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.2);
  color: #f6f6f6;
  font-size: 16px;
}
</style>

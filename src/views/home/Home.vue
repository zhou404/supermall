<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物街</div>
    </nav-bar>
    <home-swiper class="home-swiper" :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"></tab-control>
    <good-list :goods-list="goods['pop'].list"></good-list>
  </div>
</template>

<script>
//请求数据
import {getHomeMultidata, getHomeGoods} from "@/network/home";
import NavBar from "@/components/common/navbar/NavBar";
//导入轮播图组件
import HomeSwiper from "@/views/home/Childcomps/HomeSwiper";
//导入Recommend组件
import RecommendView from "@/views/home/Childcomps/RecommendView";
//导入Feature组件
import FeatureView from "@/views/home/Childcomps/FeatureView";
//导入TabControl组件
import TabControl from "@/components/content/mainTabBar/TabControl";
//导入商品列表
import GoodList from "@/components/content/goods/GoodList";

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //这里的page从0开始，因为初始是没有数据的，list为空，所以page为0，当然改成page为1也行
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      }
    }
  },
//  生命周期函数，在Home组件创建时就请求数据
  created() {
    //1.请求轮播图、推荐数据
    this.getHomeMultidata()
    //2.请求商品数据
    //流行
    this.getHomeGoods('pop')
    //新款
    this.getHomeGoods('new')
    //精选
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      //因为本地库里page初始值为0，但是数据库中的page初始值为1，所以要+1
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log(res.data.data.list);
        //这里使用push向数组中加入数据，...res.data.list是新语法，表示将res.data.list中的数据依次向本地的list中push，当数据改变时，本地的list数据也响应改变
        this.goods[type].list.push(...res.data.data.list)
        //page+1，本地的list中的page+1
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: #ff8198;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.2);
  color: #f6f6f6;
  font-size: 16px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.home-swiper {
  margin-top: 44px;
}

.tab-control {
  position: sticky;
  top: 43px;
  background-color: #ffffff;
  z-index: 9;
}
</style>

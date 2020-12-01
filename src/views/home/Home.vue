<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" ref="tabControl1" :titles="['流行', '新款', '精选']" @tabClick="tabClick" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="conetntScroll" :pullUpLoad="true" @loadmore="LoadMore">
      <home-swiper class="home-swiper" :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <good-list :goods-list="showGoods"></good-list>
    </scroll>
    <!--当我们需要监听一个组件的原生事件(不一定是点击事件)时，必须给对应的事件上加上.native修饰符，才能进行监听-->
    <!-- <back-top @click="backClick"></back-top> -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
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
import TabControl from "@/components/content/tabControl/TabControl";
//导入商品列表
import GoodList from "@/components/content/goods/GoodList";
//导入BackTop组件
import BackTop from "@/components/content/backTop/BackTop";

//导入Better-Scroll滚动组件
import Scroll from "@/components/common/scroll/Scroll";
//导入防抖动函数
import {debounce} from "@/common/utils";

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
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
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
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
  // 进入组件时触发
  activated() {
    this.$refs.scroll.bs.scrollTo(0, this.saveY, 0)
    // 修复连续切换时，有时页面返回顶部问题
    this.$refs.scroll.refresh()
  },
  // 离开组件时触发
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY);
  },
  mounted() {
    // 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  destroyed() {
    console.log('Home 别销毁了');
  },
  methods: {
    /**
     * 事件响应函数
     * */
    // 刷新频繁的防抖动函数处理
    // 参数：需要做防抖动处理的函数、延迟时间
    // debounce(func, delay) {
    //   let timer = null
    //   return function (...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      //this.$refs.scroll是获取到ref值为scroll的组件，后面可以加.组件内定义的东西(methods、computed、data等)
      //scroll(x, y, time)方法：滚动到指定(x, y)位置，过程时间为500ms
      // this.$refs.scroll.bs.scrollTo(0, 0, 500)
      this.$refs.scroll.backTop(0, 0, 500)
    },
    conetntScroll(position) {
      // console.log(position);
      // 判断BackTop是否显示
      this.isShow = (- position.y) > 1000
      // 决定tabControl是否吸顶(position：fixed)，默认不吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    LoadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获取加载完成的事件监听
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      // 这里拿到的高度不是准确的，因为图片的加载会影响这里获取的高度
      // console.log(this.$refs.tabControl.$el.offsetTop);
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop + 43
    },
    /**
     * 网络请求相关方法
     */
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
        // console.log(res.data.data.list);
        //这里使用push向数组中加入数据，...res.data.list是新语法，表示将res.data.list中的数据依次向本地的list中push，当数据改变时，本地的list数据也响应改变
        this.goods[type].list.push(...res.data.data.list)
        //page+1，本地的list中的page+1
        this.goods[type].page += 1
        // 再次刷新
        this.$refs.scroll.AgainLoad()
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
  position: relative;
  z-index: 9;
}

.home-swiper {
  margin-top: 44px;
}

/*.tab-control {*/
  /*position: sticky，原生，当tab-control达到top高度时固定住不动，新属性，部分PC端可能不支持*/
  /*position: sticky;*/
  /*top: 44px;*/
  /*background-color: #ffffff;*/
  /*z-index: 9;*/
/*}*/
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*}*/
</style>

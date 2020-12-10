<template>
  <div id="GoodsDetail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="scrollListener">
      <detail-swiper :top-images="TopImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-goods-info="detailGoodsInfo" @imageload="imageLoad"/>
      <detail-param-info :params-info="paramsInfo" ref="params"/>
      <detail-goods-rate :goods-rate="goodsRate" ref="comment"/>
      <detail-sku-info :goods-skus-info="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
//导入DetailNavBar组件
import DetailNavBar from "@/views/detail/Childcomps/DetailNavBar";
//导入DetailSwiper组件
import DetailSwiper from "@/views/detail/Childcomps/DetailSwiper";
//导入DetailBaseInfo组件
import DetailBaseInfo from "@/views/detail/Childcomps/DetailBaseInfo";
//导入DetailShopInfo组件
import DetailShopInfo from "@/views/detail/Childcomps/DetailShopInfo";
//导入DetailGoodsInfo组件
import DetailGoodsInfo from "@/views/detail/Childcomps/DetailGoodsInfo";
//导入DetailParamInfo组件
import DetailParamInfo from "@/views/detail/Childcomps/DetailParamInfo";
//导入DetailGoodsRate组件
import DetailGoodsRate from "@/views/detail/Childcomps/DetailGoodsRate";
//导入DetailSkuInfo组件
import DetailSkuInfo from "@/views/detail/Childcomps/DetailSkuInfo";
//导入DetailBottomBar组件
import DetailBottomBar from "@/views/detail/Childcomps/DetailBottomBar";

//导入请求数据函数
import {getDetailData, GoodsInfo, Shop, GoodsParam, getRecommendData} from "@/network/detail";
//导入Scroll滚动组件
import Scroll from "@/components/common/scroll/Scroll";
//导入BackTop混入函数
import {backTopMixin} from "@/common/mixin";
//导入防抖动函数
import {debounce} from "@/common/utils";

export default {
  name: "detail",
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailGoodsRate,
    DetailSkuInfo,
    DetailBottomBar,
    Scroll
  },
  data() {
    return {
      iid: null,
      TopImages: [],
      goods: {},
      shop: {},
      detailGoodsInfo: {},
      paramsInfo: {},
      goodsRate: {},
      recommends: [],
      themeTopYs: [],
      themeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    // 保存商品id
    this.iid = this.$route.params.iid
    // 请求数据
    getDetailData(this.iid).then(res => {
      console.log(res);
      const data = res.data.result
      // 1.顶部轮播图图片
      this.TopImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.获取商品详情信息
      this.detailGoodsInfo = data.detailInfo
      // 5.获取商品参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取商品评价信息
      this.goodsRate = data.rate

      // 在全部的数据都成功传入之后，获取到每个组件的高度，并保存到数组中
      // $nextTick()方法能确保DOM加载完之后再执行里面的代码,但是图片未加载完
      // this.$nextTick(() => {
        // 每次进来的时候都将数组赋值为空，避免出现重复
        // this.themeTopYs = []
        // this.themeTopYs.push(0)   //商品
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      // })

      // 给获取 Y 值加上防抖函数，提高性能
      this.themeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)   //商品
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        // console.log(this.themeTopYs);
      }, 100)
    })
    // 获取推荐商品信息
    getRecommendData().then(res => {
      this.recommends = res.data.data.list
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      // 每次图片加载完之后，获取各个组件的 Y 值
      this.themeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.backTop(0, -this.themeTopYs[index], 500)
    },
    scrollListener(position) {
      // 思路：[0, 5471, 6123, 6321]
      // positionY 在 0 到 5471 之间 ，index = 0， 情况一，i < length - 1
      // positionY 在 5471 到 6123 之间 ，index = 1，情况一，i < length - 1
      // positionY 在 6123 到 6321 之间 ，index = 2，情况一，i < length - 1
      // positionY 大于 6321 ，index = 3，情况二，i == length - 1
      // 根据测试，一下方法为比较好的方法：创建一个currentIndex来保存当前滚动区域的index，相同的话就不执行if中的语句，表示此时在同一个组件区域中
      // 分别判断以上情况，并满足条件时设置nav中的currentIndex值，以改变颜色
      const positionY = -position.y   // 注意负号
      const length = this.themeTopYs.length
      for (let i = 0 ; i < length ; i ++){
        // 这里分两种情况，因为要使用 i+1 的操作，当最后一个 i 再 +1 之后就会愈值
        // 判断当前是不是同一个组件区域 && (情况一的判断条件 || 情况二的判断情况)
        if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断BackTop是否显示
      this.listenShowBackTop(position)
    },
    addToCart() {
      // 1.获取当前商品的，购物车需要进行展示的数据，整体是一个对象
      const product = {}
      product.image = this.TopImages[0]               //图片
      product.title = this.detailGoodsInfo.title      //标题
      product.desc = this.detailGoodsInfo.desc        //描述
      product.price = this.detailGoodsInfo.realPrice  //价格
      product.iid = this.iid                          //iid唯一商品标识
      // 提交数据
      this.$store.commit('addCart', product)
    }
  },
  mounted() {
    // 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('detailItemImgLoad', () => {
      refresh()
    })
  }

}
</script>

<style scoped>
#GoodsDetail {
  position: relative;
  z-index: 10;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content {
  height: calc(100% - 44px - 45px);
}
</style>

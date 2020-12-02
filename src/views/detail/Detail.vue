<template>
  <div id="GoodsDetail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="TopImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-goods-info="detailGoodsInfo" @imageload="imageLoad"/>
      <detail-param-info :params-info="paramsInfo"/>
      <detail-goods-rate :goods-rate="goodsRate"/>
      <detail-sku-info :goods-skus-info="goodsSkusInfo"/>
    </scroll>
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

//导入请求数据函数
import {getDetailData, GoodsInfo, Shop, GoodsParam} from "@/network/detail";
//导入Scroll滚动组件
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailGoodsRate,
    DetailSkuInfo,
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
      goodsSkusInfo: {}
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
      // 7.获取同款商品信息
      this.goodsSkusInfo = data.skuInfo.skus
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
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
  height: calc(100% - 44px);
}
</style>

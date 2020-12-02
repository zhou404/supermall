<template>
  <div id="GoodsDetail">
    <detail-nav-bar/>
    <detail-swiper :top-images="TopImages"/>
    <detail-base-info :goods="goods"/>
  </div>

</template>

<script>
//导入DetailNavBar组件
import DetailNavBar from "@/views/detail/Childcomps/DetailNavBar";
//导入DetailSwiper组件
import DetailSwiper from "@/views/detail/Childcomps/DetailSwiper";
//导入DetailBaseInfo组件
import DetailBaseInfo from "@/views/detail/Childcomps/DetailBaseInfo";

//导入请求数据函数
import {getDetailData, GoodsInfo} from "@/network/detail";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data() {
    return {
      iid: null,
      TopImages: [],
      goods: null
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
    })
  },

}
</script>

<style scoped>

</style>

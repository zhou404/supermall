<template>
  <div id="GoodsDetail">
    <detail-nav-bar/>
    <detail-swiper :top-images="TopImages"/>
  </div>

</template>

<script>
//导入DetailNavBar组件
import DetailNavBar from "@/views/detail/Childcomps/DetailNavBar";
//导入DetailSwiper组件
import DetailSwiper from "@/views/detail/Childcomps/DetailSwiper";

//导入请求数据函数
import {getDetailData} from "@/network/detail";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      TopImages: []
    }
  },
  created() {
    // 保存商品id
    this.iid = this.$route.params.iid
    // 请求数据
    getDetailData(this.iid).then(res => {
      console.log(res);
      // 1.顶部轮播图图片
      this.TopImages = res.data.result.itemInfo.topImages
    })
  },

}
</script>

<style scoped>

</style>

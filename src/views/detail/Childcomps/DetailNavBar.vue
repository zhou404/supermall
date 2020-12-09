<template>
  <nav-bar>
    <div slot="nav-left" class="back" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt="">
    </div>
    <div slot="nav-center" class="title">
      <div v-for="(item, index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
//导入NavBar组件
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.back {
  text-align: center;
}
.back img {
  margin-top: 10px;
}
.active {
  color: #ff8198;
}
</style>

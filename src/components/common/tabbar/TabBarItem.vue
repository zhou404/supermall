<template>
  <div class="tab-bar-item" @click="ItemClick">
    <div v-if="!isActive" >
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    ActiveColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    // 使用计算属性
    // 获取当前处于活跃状态的组件的 path，和点击时传过来的 path 对比，相同的（点击的和要变红的一样）就将 isActive 变为 true
    // indexOf() 函数：不同为 -1，相同为非 -1
    isActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    activeColor() {
      return this.isActive ? {color: this.ActiveColor} : {}
    }
  },
  methods: {
    ItemClick() {
      this.$router.replace(this.path).catch(err => {err})
      // this.isActive = true
      document.title = this.$route.matched[0].meta.title
      // console.log(this.$route)
    }
  },
};
</script>

<style scoped>
.tab-bar-item {
  /* 将元素根据父元素的宽度进行均等分，一个元素占一份 */
  flex: 1;
  /* 元素内部内容居中 */
  text-align: center;
  /* 一般情况下 tab-bar 的高度都为 49px */
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: bottom;
  margin-bottom: 2px;
}
</style>
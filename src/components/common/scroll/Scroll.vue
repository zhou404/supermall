<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  name: "Scroll",
  data() {
    return {
      //这里定义一个bs，接收Better-Scroll的实例，作用是将Better-Scroll实例保存下来
      //让Home.vue中能够通过this.$refs.(ref值).bs得到这个实例，并且可以使用实例中的方法
      bs: null,
    }
  },
  mounted() {
    // 1.创建bs对象
    this.bs = new BScroll(this.$refs.wrapper, {
      click: true,
      // 新特性，在better-scroll中有vue组件的时候，需要在对象中传入一个属性observeDOM: true才有用
      observeDOM: true,
      // 监听滚动的位置
      probeType: this.probeType,
      // 上拉加载更多
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动的位置
    this.bs.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })
    // 3.监听上拉加载更多
    this.bs.on('pullingUp', () => {
      // console.log('上拉加载更多');
      this.$emit('loadmore')
    })
  },
  methods: {
    // 返回顶部
    backTop(x, y, time) {
      this.bs.scrollTo(x, y, time)
    },
    // 再一次使用上拉加载更多
    AgainLoad() {
      this.bs.finishPullUp()
    },
    refresh() {
      this.bs.refresh()
    }
  }
}
</script>

<style scoped>

</style>

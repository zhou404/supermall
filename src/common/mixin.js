import BackTop from "@/components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    listenShowBackTop(position) {
      // 判断BackTop是否显示
      this.isShow = (- position.y) > 1000
    },
    backClick() {
      //this.$refs.scroll是获取到ref值为scroll的组件，后面可以加.组件内定义的东西(methods、computed、data等)
      //scroll(x, y, time)方法：滚动到指定(x, y)位置，过程时间为500ms
      // this.$refs.scroll.bs.scrollTo(0, 0, 500)
      this.$refs.scroll.backTop(0, 0, 500)
    },
  }
}

<template>
  <div class="tab-bar-item" @click="ItemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="ActiveColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  name: "TabBarItem",
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    ItemClick() {
      this.$router.replace(this.path).catch(err => {err})
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    ActiveColor() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  padding-top: 5px;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
}

.active {
  color: red;
}
</style>

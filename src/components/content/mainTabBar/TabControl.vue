<template>
  <div class="TabControl">
    <div v-for="(item, index) in titles" class="tab-control-item" :class="{active: index === currentIndex}" @click="ItemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: ['titles'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    ItemClick(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.TabControl {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: #ff8198;
}
.active span {
  border-bottom: 2px solid #ff8198;
}
</style>

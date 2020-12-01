<template>
  <div id="app">
    <!-- keep-alive 保证组件不会被销毁 -->
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
.main-tab-bar {
  z-index: 999;
}
</style>

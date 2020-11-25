<template>
    <div>
        <nav-bar class="home-nav">
          <div slot="nav-center">购物街</div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
    export default {
        name: 'Home',
      components: {
          NavBar
      }
    }
</script>

<style scoped>
.home-nav {
  background-color: #ff8198;
  box-shadow: 0 2px 2px rgba(100,100,100,0.2);
  color: #f6f6f6;
  font-size: 16px;
}
</style>

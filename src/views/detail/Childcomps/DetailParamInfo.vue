<template>
  <div class="detail-param-info" v-if="Object.keys(paramsInfo).length !== 0">
    <table class="info-sizes" v-for="(table, index) in paramsInfo.sizes" :key="index">
      <tr class="ada" v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="info in paramsInfo.infos">
        <td class="info-key">{{ info.key }}</td>
        <td class="info-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramsInfo.image.length !== 0">
      <img :src="paramsInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  name: "DetailParamInfo"
}
</script>

<style scoped>
.detail-param-info {
  padding: 20px;
  font-size: 14px;
  border-bottom: 5px solid rgba(100,100,100,0.1);
  position: relative;
}
table{
  width: 100%;
  height: 30px;
  line-height: 30px;
  /*设置边框必须要设置这个属性*/
  border-collapse: collapse;
}
table tr {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  height: 20px;
}
.info-param {
  border-top: 1px solid rgba(100,100,100,0.2);
}
.info-key {
  width: 50px;
}
.info-value {
  color: #ff8198;
  padding-left: 25px;
}
.info-img {
  margin-top: 10px;
}
.info-img img {
  width: 100%;
}
</style>

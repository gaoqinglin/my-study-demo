<template>
  <div class="map-page">
    <div id="mapContainer" class="map-container"></div>
  </div>
</template>
<script lang="ts" setup name="MapPage">
let BMap = window['BMap']
let mapState = reactive({
  mapObj: null,
})
onMounted(() => {
  initMap()
})
// 初始化地图
const initMap = () => {
  mapState.mapObj = new BMap.Map('mapContainer', { enableMapClick: false }); // 创建地图实例 
  let point = new BMap.Point(116.404, 39.915);  // 创建点坐标 
  mapState.mapObj.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
  mapState.mapObj.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
}
</script>
<style lang="scss" scoped>
.map-page {
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
  }
}
</style>
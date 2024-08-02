<template>
  <div class="map-fence">
    <div id="mapContainer" class="map-container">
    </div><div class="operate-container">
      <el-button type="primary" @click="startEdit">开始编辑</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup name="MapFence">
import { fencePoint } from '@/data/mapfence'
let BMap = window['BMap']
let state = reactive({
  mapObj: null,
  polygon: null,
})
onMounted(() => {
  initMap()
  showFence()
})
// 初始化地图
const initMap = () => {
  state.mapObj = new BMap.Map('mapContainer', { enableMapClick: false }); // 创建地图实例
  let point = new BMap.Point(116.404, 39.915);  // 创建点坐标
  // state.mapObj.setMapType(window['BMAP_HYBRID_MAP']);
  state.mapObj.centerAndZoom(point, 14);  // 初始化地图，设置中心点坐标和地图级别
  state.mapObj.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  state.mapObj.addEventListener('click', function (e) {
    console.log(e)
  })
}
// 显示围栏
const showFence = () => {
  let pointArr = []
  fencePoint.forEach(item => {
    pointArr.push(new BMap.Point(item.lng, item.lat))
  })
  let options = {
    strokeColor: 'darkgray', // 边线颜色
    fillColor: '#4aff8a', // 填充颜色。当参数为空时，折线覆盖物将没有填充效果
    strokeWeight: 1, // 边线的宽度，以像素为单位
    strokeOpacity: 0.5, // 边线透明度，取值范围0 - 1
    fillOpacity: 0.2, // 填充的透明度，取值范围0 - 1
    strokeStyle: 'solid', // 边线的样式，solid或dashed
    enableMassClear: false, // 是否在调用map.clearOverlays清除此覆盖物，默认为true
    enableEditing: false, // 是否启用线编辑，默认为false
    enableClicking: false, // 是否响应点击事件，默认为true
  }
  state.polygon = new BMap.Polygon(pointArr, options)
  state.polygon.addEventListener('mouseup', (e) => {
    console.log('e', e);
  })
  state.mapObj.addOverlay(state.polygon)
}
// 开始编辑
const startEdit = () => {
  state.polygon.enableEditing(true)
}
</script>
<style lang="scss" scoped>
.map-fence {
  width: 100%;
  height: 100%;
  position: relative;
  .map-container {
    width: 100%;
    height: 100%;
  }
  .operate-container {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 999;
  }
}
</style>
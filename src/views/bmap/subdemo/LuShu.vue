<template>
  <div class="lushu">
    <div id="mapContainer" class="map-container"></div>
    <div class="operate-container">
      <el-button type="primary" @click="lushuStart">开始</el-button>
      <el-button type="primary" @click="lushuPause">暂停</el-button>
      <el-button type="primary" @click="lushuStop">结束</el-button>
    </div>
    <div ref="scenicInfoWindow" class="scenic-info-window" v-if="state.isShowInfoWindow">
      信息窗口的内容
    </div>
  </div>
</template>
<script setup lang="ts" name="LuShu">
import { lushuPoint } from '@/data/lushu'
import { getImgUrl } from '@/utils/tools'
import * as _ from 'lodash'
let BMap = window['BMap']
let BMapLib = window['BMapLib']
let scenicInfoWindow = ref(null)
let state = reactive({
  mapObj: null,
  lushu: null,
  baseData: [],
  infoWindow: null,
  isShowInfoWindow: false,
})

onMounted(() => {
  initMap()
  showLushu()
})

const initMap = () => {
  state.mapObj = new BMap.Map('mapContainer', { enableMapClick: false });
  let point = new BMap.Point(116.404, 39.915);
  state.mapObj.centerAndZoom(point, 15);
  state.mapObj.enableScrollWheelZoom(true);
}
// 显示轨迹
const showLushu = () => {
  let pointArr = []
  let specialPoint = []
  state.baseData = _.cloneDeep(lushuPoint)
  state.baseData.forEach(item => {
    let obj = {
      point: new BMap.Point(item.lng, item.lat)
    }
    Object.assign(item, obj)
    pointArr.push(obj.point)
    if (item.type === 'transfer') {
      specialPoint.push({
        lng: item.lng,
        lat: item.lat,
        html: item.name,
        pauseTime: 3,
      })
    }
  })
  // 路书只有轨迹 在地图上没有线 需要根据点来添加线路覆盖物
  // 创建线路
  let polyline = new BMap.Polyline(pointArr, {
    strokeColor: '#FF0000',
    strokeWeight: 4,
    strokeOpacity: 0.5,
  })
  state.mapObj.addOverlay(polyline)
  // 可以给轨迹上的点添加特殊样式和功能 例如图标
  addMoreAbility(pointArr)
  // 创建路书需要三个参数 地图实例，构成路线的point的数组，配置项 // 参考 JavaScript 开源库>类参考
  state.lushu = new BMapLib.LuShu(state.mapObj, pointArr, {
    landmarkPois: specialPoint, // 要在覆盖物移动过程中，显示的特殊点
    icon: new BMap.Icon(getImgUrl('pngs/car.png'), new BMap.Size(32, 16)), // 覆盖物的icon
    speed: 500, // 覆盖物移动速度，单位米/秒
    defaultContent: '内容XXX', // 覆盖物中的内容
    autoView : true, // 是否自动调整路线视野，默认不调整
    enableRotation: true, // 是否开启marker随路走向旋转，默认为false，即不随路走向旋转
  })
  state.lushu.start()
}

// 给轨迹上的点添加额外的样式或者功能
const addMoreAbility = (pointArr: Array<any>) => {
  pointArr.forEach(item => {
    let icon = new BMap.Icon(getImgUrl('pngs/subway.png'), new BMap.Size(32, 32))
    let marker = new BMap.Marker(item, { icon, anchor: new BMap.Size(10, 10) })
    // 点击事件显示信息窗口
    marker.addEventListener('click', () => {
      let opts = {
        width: 300,
        height: 220,
        title: '',
        enableAutoPan: false,
        offset: new BMap.Size(150, 230),
        enableCloseOnClick: false
      }
      state.isShowInfoWindow = true
      nextTick(() => {
        state.infoWindow = new BMap.InfoWindow(scenicInfoWindow.value, opts)
        state.mapObj.openInfoWindow(state.infoWindow, item)
      })
    })
    state.mapObj.addOverlay(marker)
  })
}
// 开始播放轨迹
const lushuStart = () => {
  state.lushu.start()
}
const lushuPause = () => {
  state.lushu.pause()
}
const lushuStop = () => {
  state.lushu.stop()
}
</script>
<style lang="scss" scoped>
.lushu {
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
  .scenic-info-window {
    width: 100%;
    height: auto !important;
    color: #fff;
    padding: 10px;
    font-size: 12px;
    border-radius: 8px;
    background: rgba(6, 30, 52, 0.6);
    backdrop-filter: blur(2px);
  }
}
</style>
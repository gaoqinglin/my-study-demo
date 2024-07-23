<template>
  <div class="map-page">
    <div id="mapContainer" class="map-container"></div>
    <div class="operate-container">
      <el-button type="primary" @click="frameSelect">框选</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup name="HomeTown">
import type { scenicSpotPointInfo } from '../mappagemodel'
let BMap = window['BMap']
let BMapLib = window['BMapLib']
let state = reactive({
  mapObj: null, // 地图实例
  drawingManager: null, // 绘制工具实例
  drawingOverlay: null, // 绘制完成后的覆盖物
  markerClusterer: null, // 点聚合实例
  markerArr: [], // 点标记集合
  isDrawing: false,
})
const scenicPoint = reactive<scenicSpotPointInfo[]>([
  { lng: 112.18, lat: 31.01, name: '武当山景区', id: 'wudang' },
  { lng: 111.020705, lat: 30.823822, name: '三峡大坝', id: 'sanxia' },
  { lng: 114.309203, lat: 30.549902, name: '黄鹤楼', id: 'huanghelou' },
])
onMounted(() => {
  initMap()
  setSectorPoints()
})
// 初始化地图
const initMap = () => {
  state.mapObj = new BMap.Map('mapContainer', { enableMapClick: false }); // 创建地图实例
  let point = new BMap.Point(112.18, 31.01);  // 创建点坐标
  state.mapObj.centerAndZoom(point, 8);  // 初始化地图，设置中心点坐标和地图级别
  state.mapObj.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  state.mapObj.setMapType(window["BMAP_HYBRID_MAP"]);
  // const provinceId = '420000';
  // 调用行政区划数据接口
  // 加载指定区域边界
  const bdary = new BMap.Boundary();
  bdary.get('湖北省', (result) => {
    if (result && result.boundaries) {
      for (let i = 0; i < result.boundaries.length; i++) {
        const ply = new BMap.Polygon(result.boundaries[i], {
          strokeWeight: 1,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          fillColor: '#00FF00',
          fillOpacity: 0.2,
        });
        state.mapObj.addOverlay(ply);
      }
    }
  })
}

// 初始化景点标记
const setSectorPoints = () => {
  scenicPoint.forEach((item) => {
    let point = new BMap.Point(item.lng, item.lat);
    let marker = new BMap.Marker(point);
    state.markerArr.push(marker); // 点聚合使用
    marker.addEventListener('click', () => {
      getSectorInfo(item)
    })
    state.mapObj.addOverlay(marker)
  })
  setMarkerClusterer()
}
// 实现点聚合
const setMarkerClusterer = () => {
  // 详细的options配置见点聚合开源库
  state.markerClusterer = new BMapLib.MarkerClusterer(state.mapObj, {
    markers: state.markerArr,
    // styles: [
    //   {
    //     url: '',
    //     size: new BMap.Size(48, 48),
    //   }
    // ],
  })
}
// 点击标点获取详细信息
const getSectorInfo = (info: scenicSpotPointInfo) => {
  console.log(info)
  let point = new BMap.Point(info.lng, info.lat);
  state.mapObj.centerAndZoom(point, 15)
}

// 框选
const frameSelect = () => {
  // 详情见 https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b15 PolygonOptions类
  if (state.drawingManager && state.drawingManager._isOpen) {
    clearDrawingOverlay() // 关闭框选时清除绘制的遮盖物
    state.isDrawing = false
    state.drawingManager.close(); // 关闭绘制
  } else {
    state.isDrawing = true
    let options = {
      strokeColor: 'darkgray', // 边线颜色
      fillColor: '#061e34', // 填充颜色。当参数为空时，折线覆盖物将没有填充效果
      strokeWeight: 1, // 边线的宽度，以像素为单位
      strokeOpacity: 0.5, // 边线透明度，取值范围0 - 1
      fillOpacity: 0.3, // 填充的透明度，取值范围0 - 1
      strokeStyle: 'dashed', // 边线的样式，solid或dashed
      // enableMassClear: true, // 是否在调用map.clearOverlays清除此覆盖物，默认为true
      // enableEditing: true, // 是否启用线编辑，默认为false
      // enableClicking: true, // 是否响应点击事件，默认为true
    }
    // 1. 创建绘制工具
    state.drawingManager = new BMapLib.DrawingManager(state.mapObj, {
      isOpen: false, // 是否开启绘制模式
      enableDrawingTool: false, // 是否显示工具栏
      rectangleOptions: options // 矩形的样式
    })
    // 2. 设置绘制模式
    state.drawingManager.setDrawingMode(window['BMAP_DRAWING_RECTANGLE']) // 矩形
    // 3. 开启绘制
    state.drawingManager.open()
    // 4. 绘制完成回调
    state.drawingManager.addEventListener('overlaycomplete', e => {
      console.log(e);
      // 判断是否存在覆盖物 存在就清除
      clearDrawingOverlay()
      if (state.drawingOverlay) {
        state.mapObj.removeOverlay(state.drawingOverlay)
      }
      state.drawingOverlay = e.overlay
      let bounds = e.overlay.getBounds();
      state.markerArr.forEach(markerItem => {
        if (bounds.containsPoint(markerItem.getPosition())) {
          // 框选范围内
          console.log('in', markerItem);
        } else {
          console.log('out', markerItem);
        }
      })
    })
  }
}
const clearDrawingOverlay = () => {
  if (state.drawingOverlay) {
    state.mapObj.removeOverlay(state.drawingOverlay); // 清除之前的绘制图形
  }
}
</script>
<style lang="scss" scoped>
.map-page {
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
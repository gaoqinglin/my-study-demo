<template>
  <div class="map-page">
    <div class="map-page-header">
      <p class="map-page-title">笔记DEMO</p>
    </div>
    <div class="map-page-body">
      <div class="map-page-body-left">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo map-page-menu"
          :default-active="activeMenuKey"
          text-color="#fff"
          :collapse="isCollapse"
        >
          <template v-for="menuItem in menuTree">
            <el-sub-menu v-if="menuItem.children?.length > 0" :key="`sub-${menuItem.menuKey}`" :index="menuItem.menuKey">
              <template #title>
                <i-ep-Location class="mr4" v-if="menuItem.menuIcon === 'Location'" />
                <span>{{ menuItem.menuTitle }}</span>
              </template>
              <el-menu-item
                v-for="subMenuItem in menuItem.children"
                :key="subMenuItem.menuKey"
                :index="subMenuItem.menuKey"
                @click="onMenuChange(subMenuItem.menuKey)"
              >
                {{ subMenuItem.menuTitle }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-else
              :key="`item-${menuItem.menuKey}`"
              :index="menuItem.menuKey"
              @click="onMenuChange(menuItem.menuKey)"
            >
              {{ menuItem.menuTitle }}
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="expand-fold-btn" :style="{ left: isCollapse ? '16px' : '110px' }">
        <i-ep-Expand v-if="isCollapse" class="ef-icons" @click="expandFoldChange" />
        <i-ep-Fold v-else class="ef-icons" @click="expandFoldChange" />
      </div>
      <div class="map-page-body-right">
        <MapPage v-if="activeMenuKey === 'mapPage'"></MapPage>
        <HomeTown v-if="activeMenuKey === 'homeTown'"></HomeTown>
        <LuShu v-if="activeMenuKey === 'luShu'"></LuShu>
        <MapFence v-if="activeMenuKey === 'mapFence'"></MapFence>
      </div>
    </div>
  </div>
</template>
<script setup name="HomePage" lang="ts">
import MapPage from './subdemo/MapPage.vue'
import HomeTown from './subdemo/HomeTown.vue'
import LuShu from './subdemo/LuShu.vue'
import MapFence from './subdemo/MapFence.vue'
let activeMenuKey = ref<string>('mapFence')
let isCollapse = ref<boolean>(false)
const menuTree = reactive([
  {
    menuTitle: '百度地图',
    menuKey: 'mapIndex',
    menuIcon: 'Location',
    children: [
      { menuTitle: '地图初始化', menuIcon: '', menuKey: 'mapPage', },
      { menuTitle: '省份特写', menuIcon: '', menuKey: 'homeTown', },
      { menuTitle: '路书', menuIcon: '', menuKey: 'luShu', },
      { menuTitle: '电子围栏', menuIcon: '', menuKey: 'mapFence', },
    ]
  },
])
// 左侧收缩、展开
const expandFoldChange = () => {
  isCollapse.value = !isCollapse.value
}
// 菜单点击跳转
const onMenuChange = (menuKey: string) => {
  activeMenuKey.value = menuKey
}
</script>
<style lang="scss">
.map-page {
  height: 100vh;
  width: 100%;
  .map-page-header {
    height: 50px;
    width: 100%;
    background-color: #131118;
    display: flex;
    align-items: center;
    .map-page-title {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      padding: 0 16px;
    }
  }
  .map-page-body {
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
    .expand-fold-btn {
      position: absolute;
      bottom: 2px;
      transition: left 0.29s ease-in-out;
      .ef-icons {
        cursor: pointer;
        font-size: 24px;
        color: #a1a1a1;
      }
    }
    .map-page-body-left {
      max-width: 240px;
      height: 100%;
      overflow: auto;
      position: relative;
      .map-page-menu {
        height: 100%;
      }
    }
    .map-page-body-right {
      flex: 1;
      height: 100%;
    }
  }
}
</style>

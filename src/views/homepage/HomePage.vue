<template>
  <div class="home-page">
    <el-button v-for="item in moduleList" :key="item.key" type="primary" @click="toModule(item)">{{ item.title }}</el-button>
  </div>
</template>
<script setup name="HomePage" lang="ts">
import { api } from '@/api'
let router = useRouter()
let moduleList = reactive([
  {
    title: '百度地图',
    key: 'mapIndex',
  },
])
onMounted(() => {
  let params = {
    id: '1111'
  }
  api.otaPlanList(params).then(res => {
    console.log(res)
  })
})
const toModule = (item: any) => {
  router.push({ name: item.key })
}
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100%;
}
</style>

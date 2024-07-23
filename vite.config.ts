import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 在这里添加的模块都会自动导入 在项目组件中使用时不需要再单独引入 例如可直接使用 let a = ref('')
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        // 自动导入组件
        ElementPlusResolver(),
        AntDesignVueResolver(),
        // 自动导入图标
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      // 自动生成eslint规则
      eslintrc: {
        enabled: true
      }
    }),
    // 配合AutoImport 在项目中使用过的element或者antdesign组件都会自动按需引入
    Components({
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver(),
        IconsResolver({
          //只加载elementplus 图标
          enabledCollections: ["ep"]
        })
      ]
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8001,
    open: false,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:8081',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

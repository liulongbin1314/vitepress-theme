import type { Theme } from 'vitepress'
export type { EscookThemeConfig } from '../config'
import type { EscookThemeConfig } from '../config'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import EscookLayout from '../components/EscookLayout.vue'
import './style/custom.css'

export default {
  extends: { ...DefaultTheme, Layout: EscookLayout },
  enhanceApp({ app, siteData }) {
    // 获取主题配置
    const themeConfig = siteData.value.themeConfig as EscookThemeConfig
    // 获取交通灯的配置
    const trafficLights = themeConfig.trafficLights
    // 按需加载交通灯的样式表
    if (trafficLights) {
      // @ts-expect-error
      import('./style/trafficLights.css')
    }
  }
} satisfies Theme

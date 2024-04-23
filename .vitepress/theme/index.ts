import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import EscookLayout from '../components/EscookLayout.vue'
import './style/custom.css'
import './style/trafficLights.css'

export default {
  extends: { ...DefaultTheme, Layout: EscookLayout },
  enhanceApp({ app, siteData }) {
    // ...
  }
} satisfies Theme

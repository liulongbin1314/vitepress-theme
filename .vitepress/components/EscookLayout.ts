import { h, defineComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, defineClientComponent } from 'vitepress'

export default defineComponent({
  setup(_, { slots }) {
    const { Layout } = DefaultTheme
    const { site } = useData()
    const themeConfig = site.value.themeConfig
    const flag = themeConfig.musicBall && themeConfig.musicBall.enable && themeConfig.musicBall.src

    const ClientMusicBall = defineClientComponent(() => {
      return import('./EscookMusicBall.vue')
    }, [
      {
        style: { display: themeConfig.musicBall.visible ? '' : 'none' }
      }
    ])

    const ClientHomeFeatureBefore = defineClientComponent(() => {
      return import('./EscookHomeFeatureBefore')
    })

    // 渲染组件、dom，都要使用 h 函数哦
    return () => [h(Layout, null, { ...slots, 'home-features-before': h(ClientHomeFeatureBefore) }), flag && h(ClientMusicBall)]
  }
})

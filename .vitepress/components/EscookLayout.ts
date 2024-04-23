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

    return () => [h(Layout, null, slots), flag && h(ClientMusicBall)]
  }
})

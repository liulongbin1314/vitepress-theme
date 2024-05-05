import { h, defineComponent } from 'vue'
import type { RenderFunction } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, defineClientComponent } from 'vitepress'

export default defineComponent<{}>({
  setup(_, { slots }) {
    const slt = slots as { 'home-features-before': RenderFunction | undefined }
    const { Layout } = DefaultTheme
    const { site } = useData()
    const themeConfig = site.value.themeConfig
    const isShowMusicBall = themeConfig.musicBall?.enable && (themeConfig.musicBall?.src || themeConfig.musicBall?.list?.length > 0)

    // 导入音乐球组件
    const ClientMusicBall = defineClientComponent(() => {
      return import('./EscookMusicBall.vue')
    }, [
      {
        style: { display: themeConfig.musicBall && themeConfig.musicBall.visible ? '' : 'none' }
      }
    ])

    // 导入自定义的 HomeFeatureBefore 组件（鼠标滑动后的动画效果）
    const ClientHomeFeatureBefore = defineClientComponent(() => {
      return import('./EscookHomeFeatureBefore')
    })

    // 导入鼠标点击时后的 Confetti 组件
    const ClientConfetti = defineClientComponent(() => {
      return import('./EscookConfetti.vue')
    })

    // 渲染组件、dom，都要使用 h 函数哦
    return () => [
      h(Layout, null, { ...slots, 'home-features-before': () => [h(ClientHomeFeatureBefore), slt['home-features-before']?.()] }),
      isShowMusicBall && h(ClientMusicBall),
      themeConfig.confetti && h(ClientConfetti)
    ]
  }
})

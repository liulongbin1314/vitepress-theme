import type { UserConfig, DefaultTheme } from 'vitepress'

export type MusicItem = {
  name: string
  src: string
}

// 自定义主题的配置项，仅限于 themeConfig 下的选项
export interface EscookThemeConfig extends DefaultTheme.Config {
  musicBall?: {
    enable?: boolean
    visible?: boolean
    autoplay?: boolean
    loop?: boolean
    src?: string
    list?: MusicItem[]
  }
  confetti?: boolean
}

// 本主题默认提供的配置项
const escookConfig: UserConfig<EscookThemeConfig> = {
  themeConfig: {
    outline: [2, 3],
    musicBall: {
      src: '',
      enable: true,
      visible: true,
      autoplay: false,
      loop: true
    },
    confetti: true
  },
  markdown: {
    lineNumbers: true
  },
  vite: {
    ssr: {
      noExternal: ['element-plus', '@escook/vitepress-theme']
    }
  }
}

export default escookConfig

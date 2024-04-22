import type { UserConfig, DefaultTheme } from 'vitepress'

// 自定义主题的配置项，仅限于 themeConfig 下的选项
export interface EscookThemeConfig extends DefaultTheme.Config {
  trafficLights?: boolean
  musicBall?: {
    enable?: boolean
    visible?: boolean
    autoplay?: boolean
    loop?: boolean
    src: string
  }
}

// 本主题默认提供的配置项
const defaultConfig: UserConfig<EscookThemeConfig> = {
  themeConfig: {
    trafficLights: false,
    outline: [2, 3],
    musicBall: {
      src: '',
      enable: true,
      visible: true,
      autoplay: false,
      loop: true
    }
  },
  markdown: {
    lineNumbers: true
  },
  vite: {
    ssr: {
      noExternal: ['element-plus']
    }
  }
}

export default defaultConfig

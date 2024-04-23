import type { UserConfig, DefaultTheme } from 'vitepress'
export interface EscookThemeConfig extends DefaultTheme.Config {
  musicBall?: {
    enable?: boolean
    visible?: boolean
    autoplay?: boolean
    loop?: boolean
    src: string
  }
}
declare const escookConfig: UserConfig<EscookThemeConfig>
export default escookConfig

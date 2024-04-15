import type { UserConfig, DefaultTheme } from 'vitepress';
export interface EscookThemeConfig extends DefaultTheme.Config {
    trafficLights?: boolean;
}
declare const defaultConfig: UserConfig<EscookThemeConfig>;
export default defaultConfig;

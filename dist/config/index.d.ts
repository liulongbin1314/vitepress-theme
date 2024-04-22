import type { UserConfig, DefaultTheme } from 'vitepress';
export interface EscookThemeConfig extends DefaultTheme.Config {
    trafficLights?: boolean;
    musicBall?: {
        enable?: boolean;
        visible?: boolean;
        autoplay?: boolean;
        loop?: boolean;
        src: string;
    };
}
declare const defaultConfig: UserConfig<EscookThemeConfig>;
export default defaultConfig;

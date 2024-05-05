import type { UserConfig, DefaultTheme } from 'vitepress';
export type MusicItem = {
    name: string;
    src: string;
};
export interface EscookThemeConfig extends DefaultTheme.Config {
    musicBall?: {
        enable?: boolean;
        visible?: boolean;
        autoplay?: boolean;
        loop?: boolean;
        src?: string;
        list?: MusicItem[];
    };
    confetti?: boolean;
}
declare const escookConfig: UserConfig<EscookThemeConfig>;
export default escookConfig;

export type { EscookThemeConfig } from '../config';
import './style/custom.css';
declare const _default: {
    extends: {
        Layout: any;
        enhanceApp: (ctx: import("vitepress/dist/client").EnhanceAppContext) => void;
    };
    enhanceApp({ app, siteData }: import("vitepress/dist/client").EnhanceAppContext): void;
};
export default _default;

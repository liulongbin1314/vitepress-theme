export type { EscookThemeConfig } from '../config';
import './custom.css';
declare const _default: {
    extends: {
        Layout: import("vue").DefineComponent<{}, {}, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
        enhanceApp: (ctx: import("vitepress/dist/client").EnhanceAppContext) => void;
    };
    enhanceApp({ app, siteData }: import("vitepress/dist/client").EnhanceAppContext): void;
};
export default _default;

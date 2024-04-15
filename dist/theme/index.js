import DefaultTheme from 'vitepress/theme';
import './custom.css';
export default {
    extends: DefaultTheme,
    enhanceApp({ app, siteData }) {
        // 获取主题配置
        const themeConfig = siteData.value.themeConfig;
        // 获取交通灯的配置
        const trafficLights = themeConfig.trafficLights;
        // 按需加载交通灯的样式表
        if (trafficLights) {
            // @ts-expect-error
            import('./trafficLights.css');
        }
    }
};

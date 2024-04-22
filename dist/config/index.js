// 本主题默认提供的配置项
const defaultConfig = {
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
};
export default defaultConfig;

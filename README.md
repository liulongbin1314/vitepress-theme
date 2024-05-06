A beautiful [VitePress](https://vitepress.dev/zh/) theme for programmers. | [中文文档](https://www.escook.cn/index.php/2024/05/06/escook-vitepress-theme-doc/)

## Installation

```bash
npm install @escook/vitepress-theme@latest
```



## Usage

If you only want to use the VitePress theme of `@escook/vitepress-theme` without the need for secondary customization based on it. Please modify the file `.vitepress/theme/index.ts` and follow the following 3 steps to import this theme and re export it:

```ts
// 1. import vitepress theme
import Theme from '@escook/vitepress-theme'
// 2. import matching CSS styles (this step cannot be omitted)
import '@escook/vitepress-theme/style.css'

// 3. simply set the theme of "import" to "export default"
export default Theme
```

If you want to expand on the basis of my theme, such as changing certain theme styles, adding routing guards, using layout slots, etc., please modify the `.vitepress/theme/index.ts` file as follows:

```ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
// 1. import vitepress theme
import escookTheme from '@escook/vitepress-theme'
// 2. import matching CSS styles (this step cannot be omitted)
import '@escook/vitepress-theme/style.css'
// import your custom styles
import './style.css'

export default {
  // 3. specify the theme to inherit and perform secondary extensions based on this theme
  extends: escookTheme,
  Layout: () => {
    return h(escookTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // expand custom features...
  }
} satisfies Theme
```



## Configuration

### Enable background music widgets

If you want to enable background music widgets for your documents, you can refer to the following 4 steps to modify the `.vitepress/config.mts` configuration file in the project:

```ts
// 1. import the defineConfigWithTheme function
import { defineConfigWithTheme } from 'vitepress'
// 2. import configuration objects that need to be inherited
import escookConfig from '@escook/vitepress-theme/config'

export default defineConfigWithTheme({
  // 3. specify the configuration to inherit via extended
  extends: escookConfig,
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // 4. enable background music widgets through this configuration item
    musicBall: {
      src: 'https://img3.tukuppt.com/newpreview_music/09/01/62/5c89fd22dea6948307.mp3'
    },
    // omit other configuration items...
  }
})
```

Among them, all available configuration items for musicBall are as follows:

| config   | type        | default   | required | description                                                  |
| -------- | ----------- | --------- | -------- | ------------------------------------------------------------ |
| src      | string      | ""        | No       | The src address of the background music.<br/>attention:<br/>1. If no audio source is specified, musicBall will not be displayed by default<br/>2. The priority of src is higher than that of list, and only the src attribute takes effect when both src and list are specified simultaneously |
| loop     | boolean     | true      | No       | Whether or not to play on a loop                             |
| autoplay | boolean     | false     | No       | Whether or not to play automatically                         |
| enable   | boolean     | true      | No       | Whether to enable the musicBall widget                       |
| visible  | boolean     | true      | No       | When the musicBall widget is enabled, whether the widget is visible in the page |
| list     | MusicItem[] | undefined | No       | An array of music list items.<br/>Attention:<br/>1. If both src and list are specified, the list will not take effect<br/>2. If there is only one MusicItem in the list, it will be played as a single and the music list will not be displayed<br/>3. The type definition of MusicItem is `{name: string; src: string}` |



### Enable Confetti effect with mouse click

This theme has the Confetti click effect enabled by default. If you want to turn off this effect, please refer to the following method to modify the `.vitepress/config.mts` configuration file in the project:

```ts
// 1. import the defineConfigWithTheme function
import { defineConfigWithTheme } from 'vitepress'
// 2. import configuration objects that need to be inherited
import escookConfig from '@escook/vitepress-theme/config'

export default defineConfigWithTheme({
  // 3. specify the configuration to inherit via extended
  extends: escookConfig,
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // 4. through this configuration item, turn off the confetti effect of mouse clicks
    confetti: false
    // omit other configuration items...
  }
})
```



## VSCode plugin recommendation

- plugin recommendation：

  - [escook-theme](https://marketplace.visualstudio.com/items?itemName=liulongbin1314.escook-theme) VSCode theme plugin

  - [escook-translate](https://marketplace.visualstudio.com/items?itemName=liulongbin1314.escook-translate) VSCode plugin for word translation

- my blog: [https://www.escook.cn/](https://www.escook.cn/)

- my bilibili: https://space.bilibili.com/385854392



## LICENSE

[MIT](https://github.com/liulongbin1314/vitepress-theme/blob/master/LICENSE)

**Enjoy!**
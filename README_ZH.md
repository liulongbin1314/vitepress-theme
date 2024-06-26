一款面向程序员的漂亮的 [VitePress](https://vitepress.dev/zh/) 主题。

## 安装自定义主题

```bash
npm install @escook/vitepress-theme@latest
```



## 使用自定义主题

您如果只想单纯使用 `@escook/vitepress-theme` 这款 VitePress 主题，而且不需要基于它进行二次定制。请修改 `.vitepress/theme/index.ts` 文件，按照如下 3 个步骤，导入此主题并重新导出即可：

```ts
// 1. 导入 vitepress 主题
import Theme from '@escook/vitepress-theme'
// 2. 导入配套的 CSS 样式（此步骤不能省略）
import '@escook/vitepress-theme/style.css'

// 3. 把“导入”的主题“默认导出”即可
export default Theme
```

如果您想在我的主题基础之上进行扩展，例如：更改某些主题样式、添加路由守卫、使用布局插槽等，请按照如下的方式改造 `.vitepress/theme/index.ts` 文件：

```ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
// 1. 导入彬哥的主题
import escookTheme from '@escook/vitepress-theme'
// 2. 导入配套的 CSS 样式（此步骤不能省略）
import '@escook/vitepress-theme/style.css'
// 导入您的自定义的样式
import './style.css'

export default {
  // 3. 指定要继承的主题，并基于此主题进行二次扩展
  extends: escookTheme,
  Layout: () => {
    return h(escookTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 扩展自定义的功能...
  }
} satisfies Theme
```



## 使用配置文件

### 启用背景音乐的小组件

如果您想为自己的文档启用背景音乐的小组件，可以参考如下的 4 个步骤，修改项目中的 `.vitepress/config.mts` 配置文件：

```ts
// 1. 导入 defineConfigWithTheme 函数
import { defineConfigWithTheme } from 'vitepress'
// 2. 导入需要继承的配置对象
import escookConfig from '@escook/vitepress-theme/config'

export default defineConfigWithTheme({
  // 3. 通过 extends 指定要继承的配置
  extends: escookConfig,
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // 4. 通过此配置项，启用背景音乐的小组件
    musicBall: {
      src: 'https://img3.tukuppt.com/newpreview_music/09/01/62/5c89fd22dea6948307.mp3'
    },
    // 省略其它配置项...
  }
})
```

其中，musicBall 所有可用的配置项如下：

| 配置项名称 | 类型        | 默认值    | 必选 | 说明                                                         |
| ---------- | ----------- | --------- | ---- | ------------------------------------------------------------ |
| src        | string      | ""        | 否   | 背景音乐的 src 地址。<br />注意：<br />1. 如果没有指定音源，则默认不展示 musicBall<br />2. src 的优先级高于 list，同时指定 src 和 list 时仅 src 属性生效 |
| loop       | boolean     | true      | 否   | 是否循环播放                                                 |
| autoplay   | boolean     | false     | 否   | 是否自动播放                                                 |
| enable     | boolean     | true      | 否   | 是否启用 musicBall 小组件                                    |
| visible    | boolean     | true      | 否   | 启用 musicBall 小组件后，小组件在页面中是否可见              |
| list       | MusicItem[] | undefined | 否   | 音乐列表项的数组。<br />注意：<br />1. 如果同时指定了 src 和 list，则 list 不生效<br />2. 如果 list 中仅有一个 MusicItem，则会以单曲的形式播放，不会展示音乐列表<br />3. MusicItem 的类型定义是 `{ name: string; src: string }` |



### 启用鼠标点击的 confetti 效果

此主题默认已启用 confetti 点击效果。如果您想关闭此效果，请参考如下的方式修改项目中的 `.vitepress/config.mts` 配置文件：

```ts
// 1. 导入 defineConfigWithTheme 函数
import { defineConfigWithTheme } from 'vitepress'
// 2. 导入需要继承的配置对象
import escookConfig from '@escook/vitepress-theme/config'

export default defineConfigWithTheme({
  // 3. 通过 extends 指定要继承的配置
  extends: escookConfig,
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // 4. 通过此配置项，关闭鼠标点击的 confetti 效果
    confetti: false
    // 省略其它配置项...
  }
})
```



## VS Code 插件推荐

- 插件推荐：

  - [escook-theme](https://marketplace.visualstudio.com/items?itemName=liulongbin1314.escook-theme) VS Code 主题插件

  - [escook-translate](https://marketplace.visualstudio.com/items?itemName=liulongbin1314.escook-translate) 单词翻译的 VS Code 插件

- 我的博客：[https://www.escook.cn/](https://www.escook.cn/)

- 哔哩哔哩：https://space.bilibili.com/385854392



## LICENSE

[MIT](https://github.com/liulongbin1314/vitepress-theme/blob/master/LICENSE)

**Enjoy!**

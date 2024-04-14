## 安装自定义主题

```bash
npm install @escook/vitepress-theme -S
```

## 使用自定义主题

您如果只想单纯使用 `@escook/vitepress-theme` 这款 VitePress 主题，而且不需要基于它进行二次定制。请修改 `.vitepress/theme/index.ts` 文件，直接导入此主题并重新导出即可：

```ts
import Theme from '@escook/vitepress-theme'

export default Theme
```

如果您想在我的主题基础之上进行扩展，例如：更改某些主题样式、添加路由守卫等，请按照如下的方式改造 `.vitepress/theme/index.ts` 文件：

```ts
import type { Theme } from 'vitepress'
// 1. 导入彬哥的主题
import escookTheme from 'escook-vitepress-theme'
// 导入自定义的样式
import './style.css'

export default {
  // 2. 指定要继承的主题，并基于此主题进行二次扩展
  extends: escookTheme,
  enhanceApp({ app, router, siteData }) {
    // 扩展自定义的功能...
  }
} satisfies Theme
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

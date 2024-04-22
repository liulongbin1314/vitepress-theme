<script setup>
import EscookMusicBall from './EscookMusicBall.vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { site } = useData()
const themeConfig = site.value.themeConfig
</script>

<template>
  <Layout></Layout>

  <!-- 自定义的音乐球组件 -->
  <ClientOnly>
    <EscookMusicBall v-if="themeConfig.musicBall && themeConfig.musicBall.enable && themeConfig.musicBall.src" :style="{ display: themeConfig.musicBall.visible ? '' : 'none' }" />
  </ClientOnly>
</template>

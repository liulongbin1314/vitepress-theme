<script setup lang="ts">
import { useData } from 'vitepress'
import { ElSlider, ElProgress } from 'element-plus'
import 'element-plus/es/components/slider/style/css'
import 'element-plus/es/components/progress/style/css'
import '../fonts/iconfont.css'
import { ref, onMounted, computed, watchEffect } from 'vue'

/* 获取音乐球的配置 */
const { site } = useData()
const musicBallConfig = site.value.themeConfig.musicBall

/* 播放功能 */
const audioRef = ref<HTMLAudioElement | null>(null)
const duration = ref(0)
// 拖拽进度条松手后，要跳转到的时间（秒）
const nextDuration = ref(0)
const currentTime = ref(0)
const isPlay = ref(false)
// 音量，初始为 50
const volume = ref(50)
const isMute = ref(false)

// 计算属性：播放的进度
const percent = computed({
  get() {
    return (currentTime.value / duration.value) * 100 || 0
  },
  set(value) {
    nextDuration.value = (duration.value * value) / 100
    if (!isPlay.value && audioRef.value) {
      audioRef.value.currentTime = nextDuration.value
    }
  }
})

// 计算属性：展示的总时长
const durationText = computed(() => {
  return secondsToHms(duration.value)
})

// 计算属性：展示的已播放的时长
const currentTimeText = computed(() => {
  return secondsToHms(currentTime.value)
})

// 监视 volume 值的变化，动态设置 audio 的音量
watchEffect(() => {
  if (audioRef.value) {
    isMute.value = false
    audioRef.value.volume = volume.value / 100
  }
})

watchEffect(() => {
  if (audioRef.value) {
    audioRef.value.muted = isMute.value
  }
})

onMounted(() => {
  const audio = audioRef.value

  audio?.addEventListener('play', () => {
    isPlay.value = true
  })

  audio?.addEventListener('pause', () => {
    isPlay.value = false
  })

  audio?.addEventListener('timeupdate', () => {
    // 把播放进度更新到 value 值
    duration.value = audio.duration
    currentTime.value = audio.currentTime
  })

  audio?.addEventListener('canplay', () => {
    duration.value = audio.duration
  })
})

// 点击播放/暂停按钮
const onPlayPause = () => {
  isPlay.value = !isPlay.value
  isPlay.value ? audioRef.value?.play() : audioRef.value?.pause()
}

// 拖拽播放进度条,松手之后的事件处理函数
const onDurationChange = () => {
  if (audioRef.value) {
    audioRef.value.currentTime = nextDuration.value
  }
}

// 把秒格式化为“分:秒”
function secondsToHms(d: number) {
  d = Number(d)

  var m = Math.floor((d % 3600) / 60) || 0
  var s = Math.floor((d % 3600) % 60) || 0

  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="escook-music-ball">
    <audio class="audio" :src="musicBallConfig.src" :autoplay="musicBallConfig.autoplay" :loop="musicBallConfig.loop" style="display: none" ref="audioRef"></audio>

    <div class="escook-music-ball__inner">
      <div class="escook-play-pause">
        <span class="iconfont icon-playfill" v-show="!isPlay"></span>
        <span class="iconfont icon-pause" v-show="isPlay"></span>
      </div>

      <div class="escook-time">{{ durationText }}&nbsp;/&nbsp;{{ currentTimeText }}</div>

      <div class="escook-duration">
        <ElSlider style="width: 100%" :show-tooltip="false" v-model="percent" @change="onDurationChange" />
      </div>

      <div class="escook-volume">
        <ElSlider style="width: 100%" :show-tooltip="false" v-model="volume" />
        <span class="iconfont icon-ic_volume_off" v-show="isMute" @click="isMute = !isMute"></span>
        <span class="iconfont icon-ic_volume_up" v-show="!isMute" @click="isMute = !isMute"></span>
      </div>
    </div>

    <el-progress type="circle" :percentage="percent" :width="50" :show-text="false" :stroke-width="4" @click="onPlayPause" />
  </div>
</template>

<style src="./css/escook-music-ball.css"></style>

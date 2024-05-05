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
// 当前播放的音乐的索引
const current = ref(0)
// 音乐列表是否自动播放
const multiAutoplay = ref(Boolean(musicBallConfig.autoplay))
// 是否展示音乐列表
const isShowList = ref(false)

// 是否播放单首音乐
const isSingle = computed(() => musicBallConfig.src || musicBallConfig.list?.length === 1)
// 单首音乐的播放源
const singleSrc = computed(() => musicBallConfig.src || musicBallConfig.list?.[0]?.src)
// 音乐列表的播放源
const multiSrc = computed(() => musicBallConfig.list || [])

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

  audio?.addEventListener('ended', () => {
    if (current.value + 1 > multiSrc.value.length - 1) {
      current.value = 0
    } else {
      current.value++
    }
  })
})

// 点击播放/暂停按钮
const onPlayPause = () => {
  isPlay.value = !isPlay.value
  isPlay.value ? audioRef.value?.play() : audioRef.value?.pause()

  // 在列表模式下，当用户首次点击播放/暂停按钮时，把 autoplay 设为 true
  if (!isSingle.value && !multiAutoplay.value) {
    multiAutoplay.value = true
  }
}

// 拖拽播放进度条,松手之后的事件处理函数
const onDurationChange = () => {
  if (audioRef.value) {
    audioRef.value.currentTime = nextDuration.value
  }
}

// 点击了音乐 item 项
const handleMusicItemClick = (i: number) => {
  multiAutoplay.value = true
  current.value = i
}

// 鼠标离开了音乐小组件
const handleMusicBallMouseLeave = () => {
  isShowList.value = false
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
  <div class="escook-music-ball" :class="isShowList ? 'active' : ''" @mouseleave="handleMusicBallMouseLeave">
    <!-- 单首音乐 -->
    <audio v-if="isSingle" class="audio" :src="singleSrc" :autoplay="musicBallConfig.autoplay" :loop="musicBallConfig.loop" style="display: none" ref="audioRef"></audio>

    <!-- 音乐列表 -->
    <audio v-else class="audio" :src="multiSrc[current].src" :autoplay="multiAutoplay" style="display: none" ref="audioRef"></audio>

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

      <!-- 列表按钮 -->
      <div class="escook-music-list-button" v-if="!isSingle" @click="isShowList = !isShowList">
        <span class="iconfont icon-music_list"></span>
      </div>
    </div>

    <el-progress type="circle" :percentage="percent" :width="50" :show-text="false" :stroke-width="4" @click="onPlayPause" />

    <!-- 音乐列表 -->
    <div class="escook-music-list" v-if="isShowList">
      <div class="escook-music-list-item" :class="current === i ? 'active' : ''" v-for="(item, i) in multiSrc" :key="i" @click="handleMusicItemClick(i)">
        <img src="../assets/images/live.gif" alt="" class="image-live" v-if="current === i" />
        <span>{{ item.name }}</span>
      </div>

      <!-- 底部的分割线 -->
      <div class="escook-music-list-sep"></div>
    </div>
  </div>
</template>

<style src="./css/escook-music-ball.css"></style>

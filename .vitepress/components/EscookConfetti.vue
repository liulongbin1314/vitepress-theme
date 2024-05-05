<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

onMounted(() => {
  window.addEventListener('click', (e) => {
    const x = e.clientX / (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    const y = e.clientY / (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
    showConfetti(x, y)
  })
})

const showConfetti = (x: number, y: number) => {
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 10,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    origin: { x, y }
  }

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 4,
      scalar: 1.2,
      shapes: ['star']
    })

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    })
  }

  setTimeout(shoot, 0)
  setTimeout(shoot, 50)
  setTimeout(shoot, 100)
}
</script>

<template></template>

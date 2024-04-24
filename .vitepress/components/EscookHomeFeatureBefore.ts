import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      // 可用的颜色值
      const colors = ['#f00', '#0f0', '#f0f', '#0ff', '#FE7300', '#008EFF', 'red', 'red', 'red', 'red', 'red']

      // 父元素
      const parent = document.querySelector<HTMLDivElement>('.VPHomeFeatures')

      document.querySelectorAll<HTMLDivElement>('.VPHomeFeatures .VPFeature').forEach((card, i) => {
        // 为每个 card 设置自己的颜色值变量
        card.style.setProperty('--color', colors[i])

        card.addEventListener('mousemove', function (e) {
          const x = e.pageX - this.offsetLeft
          const y = e.pageY - (parent?.offsetTop || 0) - this.offsetTop
          this.style.setProperty('--x', x + 'px')
          this.style.setProperty('--y', y + 'px')
        })
      })
    })
    return () => null
  }
})

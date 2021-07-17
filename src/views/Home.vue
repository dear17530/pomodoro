<template lang="pug">
#home
  b-container.p-4
    b-row.px-5
      b-col(cols='12').date
        span {{ date }}
    b-row.px-5
      b-col(cols='6').align-self-center
        font-awesome-icon(:icon='["fas", "volume-up"]').iconsize1
      b-col(cols='6').text-right.time
        span {{ time }}
  div.countDownCircle
    div.content
      span {{ timeText }}
    div.content
      span {{ currentText }}
    div.content(v-if='status === 0').start
      b-btn(@click='start').listIcon
        font-awesome-icon(:icon='["far", "play-circle"]').iconsize1
    div.content(v-if='status !== 0').started
      b-btn.listIcon
        font-awesome-icon(:icon='["far", "times-circle"]').iconsize1
      b-btn(@click='pause').listIcon
        font-awesome-icon(:icon='["far", "pause-circle"]').iconsize2
      b-btn(v-if='current.length > 0' @click='finish(true)').listIcon
        font-awesome-icon(:icon='["far", "arrow-alt-circle-right"]').iconsize1
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      timer: 0,
      date: 0,
      time: 0
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    list () {
      return this.$store.state.list
    },
    current () {
      return this.$store.state.current
    },
    currentText () {
      let text = this.current
      if (text.length === 0) {
        if (this.list.length === 0) {
          text = '沒有事項'
        } else {
          text = '點擊開始'
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      let m = Math.floor(this.timeleft / 60)
      let s = Math.floor(this.timeleft % 60)
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return `${m}:${s}`
    }
  },
  methods: {
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    },
    start () {
      if (this.status !== 2 && this.list.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')
      if (!skip) {
        const audio = new Audio()
        audio.src = require('../assets/' + this.$store.state.sound)
        audio.play()
      }
      if (this.list.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          title: '結束'
        })
      }
    },
    timeFormate () {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      let hour = new Date().getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minutes = new Date().getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      this.date = year + '/' + month + '/' + day
      this.time = hour + ':' + minutes
    },
    updateTime () {
      this.timeFormate()
      this.update = setInterval(() => {
        this.timeFormate()
      }, 1000)
    }
  },
  created () {
    this.updateTime()
  },
  mounted () {
    this.updateTime()
  }
}
</script>

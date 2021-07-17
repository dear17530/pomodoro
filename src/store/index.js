import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    worksound: 'alarm.mp3',
    breaksound: 'alarm.mp3',
    list: [],
    finished: [],
    current: '',
    timeleft: time,
    isBreak: false,
    // 0 = 停止
    // 1 = 倒數中
    // 2 = 暫停
    status: 0,
    // 0 = 清單頁面
    // 1 = 設定頁面
    // 2 = 分析頁面
    page: 0
  },
  mutations: {
    changePage (state, data) {
      state.page = data
    },
    selectworksound (state, data) {
      state.worksound = data
    },
    selectbreaksound (state, data) {
      state.breaksound = data
    },
    addList (state, data) {
      state.list.push({
        name: data,
        edit: false,
        model: data
      })
    },
    editList (state, data) {
      state.list[data].edit = true
    },
    changeList (state, data) {
      state.list[data].name = state.list[data].model
      state.list[data].edit = false
    },
    cancelList (state, data) {
      state.list[data].model = state.list[data].name
      state.list[data].edit = false
    },
    delList (state, data) {
      state.list.splice(data, 1)
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else {
        state.current = state.list.shift().name
      }
    },
    changeStatus (state, data) {
      state.status = data
    },
    countdown (state) {
      state.timeleft--
    },
    addFinish (state) {
      if (!state.isBreak) {
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        const hour = new Date().getHours()

        state.finished.push({ name: state.current, date: month + '/' + day, time: hour })
      }
      state.current = ''
      if (state.list.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.timeleft = state.isBreak ? timeBreak : time
    },
    delFinish (state, data) {
      state.finished.splice(data, 1)
    }
  },
  getters: {
    list (state) {
      return state.list
    },
    dayDone (state) {
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      const now = month + '/' + day
      const filterFinished = state.finished.filter(function (item) {
        return item.date === now
      })
      return filterFinished
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'pomodoro'
    })
  ]
})

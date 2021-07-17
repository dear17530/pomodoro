<template lang="pug">
#settings
  b-container
    b-row
      b-col(cols='4')
        div.txt WORK
      b-col(cols='12')
        b-table(:items='workItems' :fields='workfields' @row-clicked='workselect' thead-class='d-none')
          template(#cell(select)='data')
            font-awesome-icon(:icon='["far", "dot-circle"]' v-if='worksound === data.item.src').iconPink
            font-awesome-icon(:icon='["far", "circle"]' v-else).iconGray
    b-row
      b-col(cols='4')
        div.txt BREAK
      b-col(cols='12')
        b-table(:items='breakItems' :fields='breakfields' @row-clicked='breakselect' thead-class='d-none')
          template(#cell(select)='data')
            font-awesome-icon(:icon='["far", "dot-circle"]' v-if='breaksound === data.item.src').iconPink
            font-awesome-icon(:icon='["far", "circle"]' v-else).iconGray
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      workItems: [
        { name: 'ALARM', src: 'alarm.mp3' },
        { name: 'YAY', src: 'yay.mp3' },
        { name: 'NONE', src: 'none' },
        { name: 'BIRD', src: 'BIRD.mp3' },
        { name: 'RING', src: 'RING.mp3' }
      ],
      breakItems: [
        { name: 'ALARM', src: 'alarm.mp3' },
        { name: 'YAY', src: 'yay.mp3' },
        { name: 'NONE', src: 'none' },
        { name: 'BIRD', src: 'BIRD.mp3' },
        { name: 'RING', src: 'RING.mp3' }
      ],
      workfields: [
        { key: 'select', label: '選擇' },
        { key: 'name', label: '名稱' }
      ],
      breakfields: [
        { key: 'select', label: '選擇' },
        { key: 'name', label: '名稱' }
      ]
    }
  },
  computed: {
    worksound () {
      return this.$store.state.worksound
    },
    breaksound () {
      return this.$store.state.breaksound
    }
  },
  methods: {
    workselect (item) {
      this.$store.commit('selectworksound', item.src)
    },
    breakselect (item) {
      this.$store.commit('selectbreaksound', item.src)
    }
  }
}
</script>

<template lang="pug">
#list
  b-container
    b-row.mb-3
      b-col(cols='1').ml-auto.count
        span TODAY
        span MISSION
        span {{ toDoLength }}
          span  / {{ doneLength }}
    b-row.mb-3
      b-col(cols='12')
        b-form-group(invalid-feedback='請至少輸入兩個字' :state='state')
      b-col(cols='6').d-flex.borderPink
        b-form-input(v-model='newitem' placeholder='add a new mission' :state='state' trim @keydown.enter='additem').border-0.bg-none
        b-btn(variant='bg-variant' @click='additem').pr-0
          b-icon.colorPink(icon='plus-circle')
    b-row
      b-col(cols='6').p-1
        h3.list TO DO
        b-table(:items='list' :fields='listfields' thead-class='d-none' small).list
          template(#cell(name)='data')
            b-form-input(
              v-if='data.item.edit'
              v-model='data.item.model'
              trim
              :state='data.item.state'
              @keydown.enter='changelist(data.index)'
              @keydown.esc='cancellist(data.index)'
            )
            span(v-else) {{ data.value }}
          template(#cell(action)='data')
            span(v-if='!data.item.edit').button
              b-btn(@click='editlist(data.index)').border-0.bg-none.p-0.m-0
                b-icon.colorPink(icon='pencil-fill')
              b-btn(@click='dellist(data.index)').border-0.bg-none.p-0.m-0
                b-icon.colorPink(icon='trash')
            span(v-else).button
              b-btn(@click='changelist(data.index)').border-0.bg-none.p-0.m-0
                b-icon.colorPink(icon='check').icon
              b-btn(@click='cancellist(data.index)').border-0.bg-none.p-0.m-0
                b-icon.colorPink(icon='reply-fill' font-scale="1.5")
      b-col(cols='6').p-1
        h3.list Done
        b-table-simple(small).list
            tr(v-for='(item, idx) in finished' :key='idx')
              td.listTbody {{ item.name }}
              td.listTbody
                b-btn(@click='delfinish(idx)' variant='danger').border-0.bg-none.p-0
                  b-icon.colorPink(icon='trash')
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      newitem: '',
      listfields: [
        { key: 'name', label: '名稱' },
        { key: 'action', label: '操作' }
      ]
    }
  },
  computed: {
    doneLength () {
      return this.$store.state.finished.length + this.$store.state.list.length
    },
    toDoLength () {
      return this.$store.state.list.length
    },
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    },
    list () {
      return this.$store.getters.list.map(item => {
        if (item.model.length < 2) {
          item.state = false
        } else {
          item.state = true
        }
        return item
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.state) {
        this.$store.commit('addList', this.newitem)
        this.newitem = ''
      } else {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '必須要兩個字以上'
        })
      }
    },
    editlist (index) {
      this.$store.commit('editList', index)
    },
    changelist (index) {
      console.log(index)
      if (this.list[index].state) {
        this.$store.commit('changeList', index)
      }
    },
    cancellist (index) {
      this.$store.commit('cancelList', index)
    },
    dellist (index) {
      this.$store.commit('delList', index)
    },
    delfinish (index) {
      this.$store.commit('delFinish', index)
    }
  }
}
</script>

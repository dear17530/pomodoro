<template lang="pug">
#app
  b-container.m-0.p-0
    b-row.vw-100.m-0
      b-col(cols='5')#left.m-0.p-0
        keep-alive
          Home
      b-col#right.m-0.p-0
        b-row.m-0.p-0.navbar
          b-col(cols='12').p-0
            b-navbar(toggleable='md' type='dark')
              b-container
                b-navbar-brand(to='/list' v-if='page === 0')
                  font-awesome-icon(:icon='["fas", "bars"]').mr-2.iconsize3
                  span.navbarText TO DO LIST
                b-navbar-brand(to='/settings' v-if='page === 1')
                  font-awesome-icon(:icon='["fas", "music"]').mr-2.iconsize3
                  span.navbarText RINGTONES
                b-navbar-brand(to='/analystics' v-if='page === 2')
                  font-awesome-icon(:icon='["fas", "chart-line"]').mr-2.iconsize3
                  span.navbarText ANALYSTICS
                b-navbar-toggle(target='nav-collapse')
                b-collapse#nav-collapse(is-nav)
                  b-navbar-nav(v-if='page === 0').ml-auto
                    b-nav-item(to='/settings' @click='changePage(1)')
                      font-awesome-icon(:icon='["fas", "music"]').iconsize3
                    b-nav-item(to='/analystics' @click='changePage(2)')
                      font-awesome-icon(:icon='["fas", "chart-line"]').iconsize3
                  b-navbar-nav(v-if='page === 1').ml-auto
                    b-nav-item(to='/list' @click='changePage(0)')
                      font-awesome-icon(:icon='["fas", "bars"]').iconsize3
                    b-nav-item(to='/analystics' @click='changePage(2)')
                      font-awesome-icon(:icon='["fas", "chart-line"]').iconsize3
                  b-navbar-nav(v-if='page === 2').ml-auto
                    b-nav-item(to='/list' @click='changePage(0)')
                      font-awesome-icon(:icon='["fas", "bars"]').iconsize3
                    b-nav-item(to='/settings' @click='changePage(2)')
                      font-awesome-icon(:icon='["fas", "music"]').iconsize3
        b-row.m-0.p-0.content(v-if='page === 0')
          b-col(cols='12')
            List
        b-row.m-0.p-0.content(v-if='page === 1||2')
          b-col(cols='12')
            router-view
</template>
<script>
export default {
  computed: {
    page () {
      return this.$store.state.page
    }
  },
  methods: {
    changePage (index) {
      this.$store.commit('changePage', index)
    }
  }
}
</script>

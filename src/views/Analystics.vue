<template lang="pug">
#analystics
  b-container
    b-row
      b-col(cols='12').title
        span TODAY
      b-col(cols='4')
        span.number {{ today.length }}
        span.tomato /TOMATO
      b-col(cols='8')
        apexchart(type="bar" :options="options" :series="series" height="100%")
      b-col(cols='12').title
        span WEEK
      b-col(cols='4')
        span.number {{ today.length }}
        span.tomato /TOMATO
      b-col(cols='8')
        apexchart(type="bar" :options="options" :series="series" height="100%")
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      series: [
        { name: 'day', data: [] }
      ],
      options: {
        chart: {
          legend: {
            show: false
          }
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0],
          labels: {
            style: {
              colors: ['#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000', '#F9EAD8', '#000'],
              fontSize: '16px'
            }
          },
          axisBorder: {
            show: true,
            color: '#9E9E9E'
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          labels: {
            style: {
              colors: '#000',
              fontSize: '16px'
            }
          },
          axisBorder: {
            show: true,
            color: '#9E9E9E'
          }
        },
        colors: ['#FFC6C5'],
        grid: {
          show: false
        }
      },
      txt: 0
    }
  },
  computed: {
    today () {
      return this.$store.getters.dayDone
    },
    bardata () {
      let index = 0
      const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < this.today.length; i++) {
        index = this.options.xaxis.categories.indexOf(this.today[i].time) + 1
        data[index]++
      }
      return data
    }
  },
  watch: {
    bardata: function (newValue) {
      this.series[0].data = newValue
      console.log(newValue)
    }
  },
  mounted () {
    this.series[0].data = this.bardata
  }
}
</script>

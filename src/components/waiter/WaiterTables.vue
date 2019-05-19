<template>
  <div class="main-waiter-tables">
    <b-container fluid>
      <p hidden>{{refreshWaiter}}</p>
      <b-row style="  border-bottom: 1px dotted #3F9384;">
        <b-col cols="3">
          <div style="overflow: hidden;">
            <div style="width: 1000%;">
              <div class="circle gray-table" style="float: left;"></div>
              <div style="float: left; width: 100px; height: 50px;"> - Свободен </div>
            </div>
          </div>
        </b-col>
        <b-col cols="3">
          <div style="overflow: hidden;">
            <div style="width: 1000%;">
              <div class="circle green-table" style="float: left;"></div>
            </div>
            <div style="float: left; width: 180px; height: 75px;"> - Занят, но не требует внимания (все блюда отнесены) </div>
          </div>
        </b-col>
        <b-col cols="3">
          <div style="overflow: hidden;">
            <div style="width: 1000%;">
              <div class="circle yellow-table" style="float: left;"></div>
              <div style="float: left; width: 200px; height: 75px;"> - Занят, требует внимания (статусы блюд: 'Готовится' или 'В ожидании') </div>
            </div>
          </div>
        </b-col>
        <b-col cols="3">
          <div style="overflow: hidden;">
            <div style="width: 1000%;">
              <div class="circle red-table" style="float: left;"></div>
              <div style="float: left; width: 170px; height: 50px;"> - Занят, необходимо отнести блюдо </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="table" cols=6 sm=6 md=4 lg=3 v-for="table in parsedTables" :key="table.id">
          <div class="table-color-back" @click="transitionOnOrder(table.id)"
               v-bind:class="{'gray-table': table.status === 1,
                            'red-table': table.status === 2,
                            'yellow-table': table.status === 3,
                            'green-table': table.status === 4}">
            <span>{{table.id}}</span>
            <img src="../../assets/images/table.png" alt="">
            <b-button @click="clearTableStatus(table.id)">Обнулить статус</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'WaiterTables',
  props: {},
  data () {
    return {
      elements: [],
      parsedTables: []
    }
  },
  mounted () {
    this.startRenderPage()
  },
  methods: {
    clearTableStatus: function (tableNumber) {
      this.$http.post(store.getters.host + '/waiter/clear/' + tableNumber).then((response) => {
      }).catch((err) => {
        console.log(err)
      })
      this.startRenderPage()
    },
    startRenderPage: function () {
      console.log('mounted')
      this.$http.get(store.getters.host + '/waiter').then((response) => {
        this.elements = response.body
        this.parsedTables = this.parseTables(response.body)
      }).catch((err) => {
        console.log(err)
      })
    },
    transitionOnOrder: function (tableNumber) {
      this.$route.params.tableNumber = tableNumber
      this.$router.push({path: '/waiter/orders/' + tableNumber})
    },
    parseTables (data) {
      let _tables = []
      console.log(data)
      if (data !== undefined && data !== null) {
        for (let i in data) {
          if (data[i].id && data[i].tableStatus.id) {
            let table = {
              id: data[i].id,
              status: data[i].tableStatus.id
            }
            // console.log(table)
            _tables.push(table)
          }
        }
        return _tables
      }
    }
  },
  computed: {
    refreshWaiter () {
      if (store.getters.value('refreshWaiter') === true) {
        store.dispatch('setValue', {key: 'refreshWaiter', value: false})
        this.startRenderPage()
      }
      return store.getters.value('refreshWaiter')
    }
  }
}
</script>

<style scoped>
  .circle {
    /*display: block;*/
    margin-top: 3px;
    width: 20px;
    height: 20px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  .hint {
    white-space: nowrap
  }

  .hint div {
    width: 90px;
    display: inline-block;
    border: 1px solid black
  }

  .table b-button {
    width: 100%;
    position: absolute;
    text-align: center;
    align-self: center;
  }

  .table-color-back {
    width: 155px;
    cursor: pointer;
  }

  .table span {
    position: absolute;
    width: 155px;
    text-align: center;
    top: 40%;
    font-weight: bolder;
    font-size: 22pt;
    color: black;
  }

  .table img {
    width: 155px;
    height: 155px;
  }

  .gray-table {
    background-color: #D2D2D2;
  }

  .red-table {
    background-color: red;
  }

  .yellow-table {
    background-color: yellow;
  }

  .green-table {
    background-color: green;
  }
</style>

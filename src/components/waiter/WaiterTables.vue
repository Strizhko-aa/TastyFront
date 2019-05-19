<template>
  <div class="main-waiter-tables">
    <b-container fluid>
      <p hidden>{{refreshWaiter}}</p>
      <b-row>
        <b-col class="table" cols=6 sm=6 md=4 lg=3 v-for="table in parsedTables" :key="table.id">
          <div class="table-color-back" @click="transitionOnOrder(table.id)"
            v-bind:class="{'red-table': table.status === 2,
                            'yellow-table': table.status === 3,
                            'green-table': table.status === 4}">
            <span>{{table.id}}</span>
            <img src="../../assets/images/table.png" alt="">
          </div>
          <b-button @click="clearTableStatus(table.id)">Обнулить статус</b-button>
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
.table b-button {
  width: 100%;
  position: absolute;
  text-align: center;
  align-self: center;
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

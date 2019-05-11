<template>
  <div class="main-waiter-tables">
    <b-container fluid>
      <b-row>
        <b-col class="table" cols=6 sm=6 md=4 lg=3 v-for="table in parsedTables" :key="table.id">
          <div class="table-color-back" @click="transitionOnOrder(table.id)"
            v-bind:class="{'red-table': table.status === 3 || table.status === 6,
                            'yellow-table': table.status === 5,
                            'green-table': table.status === 4 || table.status === 8}">
            <span>{{table.id}}</span>
            <img src="../../assets/images/table.png" alt="">
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
    console.log('mounted')
    this.$http.get(store.getters.host + '/waiter').then((response) => {
      this.elements = response.body
      console.log(this.elements)
      this.parsedTables = this.parseTables(response.body)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    transitionOnOrder: function (tableNumber) {
      this.$route.params.tableNumber = tableNumber
      this.$router.push({path: '/waiter/orders/' + tableNumber})
    },
    parseTables (data) {
      let _tables = []
      console.log(data[0])
      for (let i in data[0]) {
        let table = {
          id: data[0][i][0].id,
          status: data[0][i][0].tableStatus.id
        }
        // console.log(table)
        _tables.push(table)
      }
      return _tables
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
  top: 38%;
  font-weight: bold;
  font-size: 22pt;
  color: black;
}
.table img {
  width: 155px;
  height: 155px;
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

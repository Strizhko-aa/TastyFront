
export default {
  methods: {
    parseResponseMix (data) {
      let orders = []
      // this.tableNumber = data[0].id // номер столика
      // this.tableStatus = data[0].status.id
      for (let i = data[0].ordersList.length - 1; i >= 0; i--) { // в обратном порядке, чтобы последние заказы были сверху
        let order = {}
        order.id = data[0].ordersList[i].id
        order.dateOrders = data[0].ordersList[i].dateOrders
        order.typePayment = data[0].ordersList[i].typePayment
        order.total = data[3][i]
        order.tableNumber = data[0].id
        order.parsedDishes = this.parseDishesFromOrder(data[1][i])
        orders.push(order)
      }
      return orders
    },
    parseDishesFromOrder (dfo) {
      if (dfo[0] !== undefined) {
        let parsedDishes = []
        for (let i in dfo) {
          let includeIndex = this.include(dfo[i][0].dish.id, dfo[i][0].dishStatus.id, parsedDishes)
          if (includeIndex === -1) {
            let newDfo = {}
            newDfo.dish = dfo[i][0].dish
            newDfo.status = dfo[i][0].dishStatus
            newDfo.count = 1
            parsedDishes.push(newDfo)
          } else {
            parsedDishes[includeIndex].count++
          }
        }
        return parsedDishes
      } else {
        return null
      }
    },

    include (dishId, statusId, arr) {
      // console.log(arr)
      for (let i in arr) {
        if (dishId === arr[i].dish.id && statusId === arr[i].status.id) {
          return i
        }
      }
      return -1
    }
  }
}

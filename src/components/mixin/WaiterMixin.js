
export default {
  methods: {
    parseResponseMix (data) {
      let orders = []
      // console.log(data)
      // this.tableNumber = data[0].id // номер столика
      // this.tableStatus = data[0].status.id
      for (let i = data[0].ordersList.length - 1; i >= 0; i--) { // в обратном порядке, чтобы последние заказы были сверху
        if (data[0].ordersList[i] !== null) {
          let order = {}
          order.id = data[0].ordersList[i].id
          order.dateOrders = data[0].ordersList[i].dateOrders
          order.typePayment = data[0].ordersList[i].typePayment
          order.total = data[1][i]
          order.tableNumber = data[0].id
          order.parsedDishes = this.parseDishesFromOrder(data[0].ordersList[i].dishesFromOrder)
          orders.push(order)
        }
      }
      return orders
    },
    parseDishesFromOrder (dfo) {
      // console.log(dfo)
      if (dfo !== undefined) {
        let parsedDishes = []
        for (let i in dfo) {
          if (dfo[i].dishStatus !== null) {
            // console.log(dfo[i][0])
            let includeIndex = this.include(dfo[i].dish.id, dfo[i].dishStatus.id, parsedDishes)
            if (includeIndex === -1) {
              let newDfo = {}
              newDfo.dish = dfo[i].dish
              newDfo.status = dfo[i].dishStatus
              newDfo.count = 1
              newDfo.dfoIds = [] // массив dfo id нужен для того, чтобы изменять статус на отнесено
              newDfo.dfoIds.push(dfo[i].id)
              parsedDishes.push(newDfo)
            } else {
              parsedDishes[includeIndex].count++
              parsedDishes[includeIndex].dfoIds.push(dfo[i].id)
            }
          }
        }
        return parsedDishes
      } else {
        return null
      }
    },

    include (dishId, statusId, arr) {
      // console.log(arr)
      // console.log(dishId)
      // console.log(statusId)
      for (let i in arr) {
        if (dishId === arr[i].dish.id && statusId === arr[i].status.id) {
          console.log(i)
          return i
        }
      }
      console.log(-1)
      return -1
    }
  }
}

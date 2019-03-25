<template>
  <div class="main">
    <div class="popup" v-if="message" v-on:click="clearMessage()">{{message}}</div>
    <b-container v-if="menuFlag === true">
      <b-row class="height-50">
      </b-row>
      <b-row class="height-150 category-line">
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('Горячее')">
          <img class="menu-icon" src="../../assets/images/myaso.jpg" alt="горячее">
          <div class="category-name">Горячее</div>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('Салаты')">
          <img class="menu-icon" src="../../assets/images/cezar.jpg" alt="салаты">
          <div class="category-name">Салаты</div>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('Супы')">
          <img class="menu-icon" src="../../assets/images/supy.jpg" alt="супы">
          <div class="category-name">Супы</div>
        </b-col>
      </b-row>
      <b-row class="height-50">
      </b-row>
      <b-row class="height-150 category-line">
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('Десерт')">
          <img class="menu-icon" src="../../assets/images/novogodnij-desert-radost-obezyanki.jpg" alt="">
          <div class="category-name">Десерты</div>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('Закуски')">
          <img class="menu-icon" src="../../assets/images/buterbrody-s-krasnoj-ikroj-i-syrom.jpg" alt="">
          <div class="category-name">Закуски</div>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else-if="!menuFlag">
      <b-row class="back">
        <b-button class="back-button button" @click="back()">Назад</b-button>
      </b-row>
      <div v-if="dishesCount > 0">
          <b-row v-for="item in dishes" :key="item.id" class="height-150 item">
            <b-col cols="4" sm="6" md="3" class="photo">
              <img class="photo" :src="require('../../assets/images/' + item.imgUrl.substring(5, item.imgUrl.length))"
                   alt="">
            </b-col>
            <b-col cols="12" sm="3" md="6">
              <div class="name">{{ item.name }} <div class="rating"> ★★★☆☆ </div></div>
              <div class="description"> Вкусно, нежно, аппетитно. Под супер соусом с невероятным вкусом. Подается на тарелке с хлебушком.</div>
              <div class="mass"> <span v-if="item.mass !== ''">{{ item.mass }} </span> <span class="price">{{ item.price }} ₽</span></div>
            </b-col>
            <b-col v-if="!inPurchased(item.id)" cols="12" sm="3" md="3" class="quantity">
              <b-button class="button button-buy" @click="addToCard(item)">Купить</b-button>
            </b-col>
            <b-col v-else cols="12" sm="3" md="3" class="quantity">
              <div class="quantity-input">
                <button class="minus btn-Q" @click="changeCount(item, -1)">-</button>
                <input id="text_tribulus_1" :value="purchased[findPurchasedIndex(item.id)].count" class="input-text qty text" size="3"/>
                <button class="plus btn-Q" @click="changeCount(item, 1)">+</button>
                <b-button class="delete"  @click="deleteFromPurshased(item.id)"><img class="delete-icon" src="../../assets/images/delete.png"></b-button>
              </div>
            </b-col>
          </b-row>
      </div>
    </b-container>
    <router-link to="/cart" v-if="purchased.length > 0">
      <div class="cart"><img class="cart-icon" src="../../assets/images/shopping.png">
        <div class="count-goods">
        <span class="count">{{purchased.length}}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import menuStore from './menuStore'

export default {
  data () {
    return {
      routeMessage: null,
      menuFlag: true,
      dishes: [],
      category: ''
    }
  },
  created () {
    this.message = this.$route.query.message
  },
  computed: {
    dishesCount () {
      return this.dishes.length
    },
    purchased () {
      return menuStore.getters.value('purchased')
    },
    message: {
      get: function () {
        return this.routeMessage
      },
      set: function (value) {
        this.routeMessage = value
        if (value) {
          setTimeout(() => { this.clearMessage() }, 3000)
        }
      }
    }
  },
  methods: {
    clearMessage () {
      this.message = null
      this.$router.push('/')
    },
    deleteFromPurshased (id) {
      let index = this.findPurchasedIndex(id)
      menuStore.dispatch('deleteFromPurshased', index)
      let json = {'dishId': id}
      this.$http.post('http://localhost:8080/cancel', JSON.stringify(json)).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
    },

    findPurchasedIndex (searchId) {
      for (let i = 0; i < this.purchased.length; i++) {
        if (this.purchased[i].dish.id === searchId) {
          return i
        }
      }
      return null
    },

    // изменяет кол-во блюда в заказе
    changeCount (dish, value) {
      let index = this.findPurchasedIndex(dish.id)
      if (index !== null) {
        menuStore.dispatch('changeCount', {index: index, value: value})
        let json = {'dishId': dish.id}
        if (value === -1) {
          this.$http.post('http://localhost:8080/delete', JSON.stringify(json)).then(function (response) {
          }).catch(function (error) {
            console.log(error)
          })
        } else if (value === 1) {
          this.$http.post('http://localhost:8080/add', JSON.stringify(json)).then(function (response) {
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    },

    // нужен для отображения кнопок. Если блюдо куплено вернует тру иначе фолс
    inPurchased (id) {
      for (let item in this.purchased) {
        if (id === this.purchased[item].dish.id) { // если ид блюда из меню совпадает с каким-то ид купленного
          return true
        }
      }
      return false // если не нашлось
    },
    back () {
      this.menuFlag = true
    },

    // при выборе категории меняет флаг и запрашивает нужный тип блюд
    changeMenuFlag (value) {
      let _url = 'http://localhost:8080/menu/' + value
      this.$http.get(_url).then(response => {
        // console.log(response.body)
        this.dishes = response.body
      }).catch(err => {
        console.log(err)
      })
      this.menuFlag = false
      this.category = value
    },

    // добавление блюда в купленные
    addToCard (dish) {
      this.purchased.push({dish: dish, count: 1})

      let json = {'dishId': dish.id}
      this.$http.post('http://localhost:8080/add', JSON.stringify(json)).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
  .popup {
    position: absolute;
    left: 35%;
    z-index: 10;
    display: inline-block;
    white-space: nowrap;
    padding: 10px;
    border-radius: 5px;
    background-color: #ee6b00bf;
    color: #ffffff;
  }
  /* Стиль больше чем 576px */
  @media (min-width: 576px) {
    .container {
      width: 100%;
    }

    .height-50 {
      height: 50px;
    }

    .height-150 {
      height: 160px;
      margin-bottom: 10px;
    }
    .item {
      border-bottom: 1px solid #3F9384;
    }

    .menu-icon {
      width: 100%;
      height: 100%;
      border-radius: 3px 3px 0 0;
      object-fit: cover;
    }
    .photo {
      position: relative;
      padding: 0;
      height: 150px;
      border-radius: 10px 0;
      box-shadow:
        inset 1px 1px 10px 0 rgba(255,255,255,.5),
        inset -1px -1px 10px 0 rgba(0,0,0,.5),
        2px 2px 5px 0 rgba(0,0,0,.5);
    }
    .photo img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .quantity {
      text-align: right;
    }

    .quantity-input {
      overflow: hidden;
      border-radius: 0.25rem;
      display: inline-flex;
      flex-direction: row;
      margin-top: 30%;
    }

    .btn-Q {
      background: #3F9384;
      color: white;
      width: 40px;
      height: 40px;
      outline: none;
      border: none;
    }

    .input-text {
      height: 40px;
      outline: none;
      text-align: center;
    }
  }
.delete {
  padding: 0;
  width: 40px;
  height: 40px;
  margin-left: 5px;
  background: white;
  border: 0;
}
  .delete-icon {
    width: 35px;
    height: 35px;
  }
  .delete:hover .delete-icon{
    width: 37px;
    height: 37px;
  }
  .back {
    width: 100%;
    margin: 20px 0;
  }
  /* все не охваченные стили .т.е меньше чем 576 */
  .menu-icon {
    height: 120px;
    width: 100%;
    border-radius: 3px 3px 0 0;
    object-fit: cover;
  }

  .menu-item {
    margin-bottom: 20px;
    cursor: pointer;
  }

  .category-name {
    height: 40px;
    background-color: #3f9384;
    color: white;
    font-size: 18pt;
    font-weight: bolder;
    border-radius: 0 0 10px 10px;
    text-align: center;
  }

  .name {
    width: 100%;
    font-size: 25px;
    line-height: 25px;
    text-align: left;
  }

  .description {
    /* text-align: justify; */
    width: 100%;
  }

  .mass {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 20px;
    font-size: 18px;
    text-align: left;
    margin-left: 15px;
  }
  .price {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    line-height: 22px;
    font-size: 22px;
    text-align: right;
  }

  .button {
    background-color: #3F9384;
    width: 139px;
    margin-top: 30%;
    height: 40px;
    font-size: 17pt;
    line-height: 0;
  }

  .button-buy {
    width: 190px;
  }

  .photo {
    position: relative;
    padding: 0;
    height: 150px;
    border-radius: 10px 0;
    box-shadow: inset 1px 1px 10px 0 rgba(255, 255, 255, .5),
    inset -1px -1px 10px 0 rgba(0, 0, 0, .5),
    2px 2px 5px 0 rgba(0, 0, 0, .5);
  }

  .item {
    padding-bottom: 20px;
  }

  .back-button {
    margin-top: 10px;
    font-size: 15px;
    width: auto;
  }

  .btn-Q {
    background: #3F9384;
    color: white;
    width: 40px;
    height: 40px;
    outline: none;
    border: none;
  }

  .cart {
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 100px;
    height: 100px;
    z-index: 1;
  }
  .cart-icon {
    width: 80px;
    height: 80px;
  }

   .count-goods {
     position: absolute;
     right: 0;
     top: 0;
     width: 30%;
     height: 30%;
     background-color: chocolate;
     text-align: center;
     vertical-align: middle;
     border-radius: 50%;
     font-size: 22px;
     color: white;
     display: inherit;
   }
  .count{
    margin: auto;
  }
</style>

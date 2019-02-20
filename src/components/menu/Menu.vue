<template>
  <div class="main">
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
      <b-button class="back-button button-buy" @click="back()">Назад</b-button>
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
              </div>
            </b-col>
          </b-row>
      </div>
    </b-container>
    <router-link to="/cart">
      <div class="cart">Корзина({{purchased.length}})</div>
    </router-link>
  </div>
</template>

<script>
import menuStore from './menuStore'

export default {
  data () {
    return {
      menuFlag: true,
      dishes: [],
      category: '',
      purchased: [] // [{dish: dish, count: 1}]
    }
  },
  computed: {
    dishesCount () {
      return this.dishes.length
    }
  },

  watch: {
    purchased (newVal, oldVal) {
      menuStore.dispatch('setValue', {key: 'purchased', value: newVal})
    }
  },

  methods: {
    deleteFromPurchased (index) {
      this.purchased.splice(index, 1)
    },

    findPurchasedIndex (searchId) {
      for (let i = 0; i < this.purchased.length; i++) {
        if (this.purchased[i].dish.id === searchId) {
          return i
        }
      }
      return null
    },

    changeCount (dish, value) {
      let index = this.findPurchasedIndex(dish.id)
      if (index !== null) {
        this.purchased[index].count += value
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
      if (this.purchased[index].count === 0) {
        this.deleteFromPurchased(index)
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
      // let elem = document.getElementsByClassName('button button-buy')[index]
      // if (elem == null) {
      //   elem = document.getElementsByClassName('button button-purchased')[index]
      // }
      // let json = {'name': document.getElementsByClassName('name')[index].textContent, 'tableNumber': 4}
      // switch (elem.textContent) { // ToDo - учитывая, что еще добавятся кнопки, все здесь еще поменяется
      //   case 'Купить': // ToDo - а как достать номер столика с которого посетитель сделал заказ?
      //     this.$http.post('http://localhost:8080/buy', JSON.stringify(json)).then(function (response) {
      //     }).catch(function (error) {
      //       console.log(error)
      //     })
      //     break
      //   case 'Куплено':
      //     this.$http.post('http://localhost:8080/remove', JSON.stringify(json)).then(function (response) {
      //     }).catch(function (error) {
      //       console.log(error)
      //     })
      //     break
      // }
    }
  }
}

</script>

<style scoped>
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
    width: 139px;
    margin-top: 30%;
    height: 40px;
    font-size: 17pt;
    line-height: 0;
  }

  .button-buy {
    background-color: #3F9384;
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
    position: absolute;
    top: 38px;
    right: 160px;
  }
</style>

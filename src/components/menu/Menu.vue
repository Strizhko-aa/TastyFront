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
    <b-container fluid v-else-if="!menuFlag">
      <b-button class="back-button button-buy" @click="back()">Назад</b-button>
      <div v-if="dishesCount > 0">
        <!-- <div v-for="(item, index) in dishes" :key="item.id">
          <b-row class='height-50'>
          </b-row> -->
          <b-row v-for="(item) in dishes" :key="item.id" class="height-150 item">
            <b-col md="3">
              <img class="photo" :src="require('../../assets/images/' + item.imgUrl.substring(5, item.imgUrl.length))"
                   alt="">
            </b-col>
            <b-col md="6">
              <div class="name">{{ item.name }}</div>
              <div class="mass">{{ item.price }} руб <span v-if="item.mass !== ''">{{ item.mass }} гр</span></div>
            </b-col>
            <b-col md="3">
              <b-button v-if="inPurchased(item.index)" class="button button-buy" @click="addToCard(item.id)">Купить</b-button>
              <b-button v-else class="button button-purchased">Куплено</b-button>
            </b-col>
            <!-- <b-col v-else md="3">
              <b-button class="button button-purchased">Куплено</b-button>
            </b-col> -->
          </b-row>
        <!-- </div> -->
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuFlag: true,
      dishes: [],
      category: '',
      purchased: [] // [{id: 0, count: 0}]
    }
  },
  computed: {
    dishesCount () {
      return this.dishes.length
    }
  },
  watch: {
    dishes (newVal, oldVal) {
      for (let i = 0; i < newVal.length; i++) {
        this.purchased.push(false)
      }
    }
  },
  methods: {
    inPurchased (id) {
      for (let item in this.purchased) {
        if (id === this.purchased[item].id) {
          return true
        }
      }
      return false
    },
    back () {
      this.menuFlag = true
    },
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
    addToCard (id) {
      this.purchased.push({id: id, count: 1})
      console.log('IN CLICK' + id)

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
    .height-50 {
      height: 50px;
    }

    .height-150 {
      height: 150px;
    }

    .menu-icon {
      width: 100%;
      height: 100%;
      border-radius: 3px 3px 0 0;
      object-fit: cover;
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
    font-size: 30px;
    line-height: 30px;
    text-align: left;
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

  .button {
    width: 100%;
    margin-top: 30px;
    height: 60px;
    font-size: 22pt;
    line-height: 0;
  }

  .button-buy {
    background-color: #3F9384;
  }

  .button-purchased {
    cursor: default;
    background-color: gainsboro;
    outline: none;
  }

  .photo {
    position: relative;
    padding: 0;
    height: 130px;
    max-width: 200px;
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
</style>

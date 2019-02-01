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
        <div v-for="(item, index) in dishes" :key="item.id">
          <b-row class='height-50'>
          </b-row>
          <b-row class="height-150 item">
            <b-col md="3">
              <img class="photo" :src="require('../../assets/images/' + item.imgUrl.substring(5, item.imgUrl.length))"
                   alt="">
            </b-col>
            <b-col md="6">
              <div class="name">{{ item.name }}</div>
              <div class="mass">{{ item.price }} руб <span v-if="item.mass !== ''">{{ item.mass }} гр</span></div>
            </b-col>
            <b-col v-if="purchased[index] === false" md="3">
              <b-button class="button button-buy" @click="addToCard(index)">Купить</b-button>
            </b-col>
            <b-col v-else md="3">
              <b-button class="button button-purchased">Куплено</b-button>
            </b-col>
          </b-row>
        </div>
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
      purchased: []
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
    back () {
      this.menuFlag = true
    },
    createImgUrl (imgUrl) {
      let _url = '../../assets/images/' + imgUrl.substring(5, imgUrl.length)
      return require(_url)
    },
    changeMenuFlag (value) {
      let _url = 'http://localhost:8080/menu/' + value
      this.$http.get(_url).then(response => {
        console.log(response.body)
        this.dishes = response.body
      }).catch(err => {
        console.log(err)
      })
      this.menuFlag = false
      this.category = value
    },
    addToCard (iiii) {
      this.purchased[iiii] = true
      console.log('IN CLICK' + iiii)
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

<template>
  <div class="main">
    <b-container v-if="menuFlag === true">
      <b-row class="height-50">
      </b-row>
      <b-row class="height-150 category-line">
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('hot')">
          <img class="menu-icon" src="../../assets/images/myaso.jpg" alt="горячее">
          <div class="category-name">Горячее</div>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="menu-item"  @click="changeMenuFlag('salat')">
          <img class="menu-icon" src="../../assets/images/cezar.jpg" alt="салаты">
          <div class="category-name">Салаты</div>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="menu-item"  @click="changeMenuFlag('soup')">
          <img class="menu-icon" src="../../assets/images/supy.jpg" alt="супы">
          <div class="category-name">Супы</div>
        </b-col>
      </b-row>
      <b-row class="height-50">
      </b-row>
      <b-row class="height-150 category-line">
        <b-col cols="12" sm="6" md="4" class="menu-item" @click="changeMenuFlag('hot')">
          <img class="menu-icon" src="../../assets/images/novogodnij-desert-radost-obezyanki.jpg" alt="">
          <div class="category-name">Десерты</div>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="menu-item"  @click="changeMenuFlag('salat')">
          <img class="menu-icon" src="../../assets/images/buterbrody-s-krasnoj-ikroj-i-syrom.jpg" alt="">
          <div class="category-name">Закуски</div>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else-if="!menuFlag && category == 'salat'">
      <b-row class='height-50'>
      </b-row>
      <b-row class="height-150 item">
        <b-col md="3">
          <img class="menu-icon photo" src="../../assets/images/cezar.jpg" alt="cezar">
        </b-col>
        <b-col md="6">
          <div class="name">Цезарь с курицей</div>
          <div class="mass">250 гр.<br>500 Ккал</div>
        </b-col>
        <b-col md="3">
          <div v-if="!purchased[1]"><b-button class="button button-buy" @click="addToCard(1)">Купить</b-button></div>
          <div v-else><b-button class="button button-purchased">Куплено</b-button></div>
        </b-col>
      </b-row>
      <b-row class='height-50'>
      </b-row>
      <b-row class="height-150 item">
        <b-col md="3">
          <img class="menu-icon photo" src="../../assets/images/salat-s-krasnoj-ryboj.jpg" alt="cezar">
        </b-col>
        <b-col md="6">
          <div class="name">Салат с красной рыбой</div>
          <div class="mass">250 гр.<br>300 Ккал</div>
        </b-col>
        <b-col md="3">
          <div v-if="!purchased[1]"><b-button class="button button-buy" @click="addToCard(1)">Купить</b-button></div>
          <div v-else><b-button class="button button-purchased">Куплено</b-button></div>
        </b-col>
      </b-row>
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
      purchased: [false, false]
    }
  },
  methods: {
    changeMenuFlag (value) { // АПИ еще нет, так что долблюсь в радномный порт, ибо если долбиться в 8080 когда он занят vue дело не благородное
      // let _url = 'localhost:8081/dishes&type=' + value
      // this.$http.get(_url).then(response => {
      //   this.dishes = response.body.result
      //   this.menuFlag = false
      // }).catch(err => {
      //   console.log(err.status)
      //   this.dishes = []
      //   this.menuFlag = true
      // })
      this.menuFlag = false
      this.category = value
    },
    addToCard (index) {
      console.log(this.purchased[index])
      this.purchased[index] = true
      console.log(this.purchased[index])
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
  box-shadow:
          inset 1px 1px 10px 0 rgba(255,255,255,.5),
          inset -1px -1px 10px 0 rgba(0,0,0,.5),
          2px 2px 5px 0 rgba(0,0,0,.5);
}
.item {
  padding-bottom: 20px;
}
</style>

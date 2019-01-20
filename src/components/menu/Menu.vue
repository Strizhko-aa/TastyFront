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
    </b-container>
    <b-container v-else>
      запрос списка горячих блюд/салатов/супов, как вывети еще подумать
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuFlag: true,
      dishes: []
    }
  },
  methods: {
    changeMenuFlag (value) { // АПИ еще нет, так что долблюсь в радномный порт, ибо если долбиться в 8080 когда он занят vue дело не благородное
      let _url = 'localhost:8081/dishes&type=' + value
      this.$http.get(_url).then(response => {
        this.dishes = response.body.result
        this.menuFlag = false
      }).catch(err => {
        console.log(err.status)
        this.dishes = []
        // this.menuFlag = true
      })
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
    /* height: 150px; */
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
}
.category-name {
  height: 40px;
  background-color: #3f9384;
  color: white;
  font-size: 18pt;
  font-weight: bolder;
  border-radius: 0 0 10px 10px;
}
</style>

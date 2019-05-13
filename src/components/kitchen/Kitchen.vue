<template>
  <div class="hello">
    <div class="container">
      <!-- проверка что элементы есть -->
      <p hidden>{{refreshKitchen}}</p>
      <div class="row" v-if="elements.length > 0 && mobile" >
        <ElementDish class="col-12" v-for="v in elements" v-bind:key="v.id" v-bind:data="v" v-bind:updateComponent="updateComponent"/>
      </div>
      <div class="row" v-else-if="elements.length > 0">
        <div class="col-12 col-lg-6" v-if="flagL">
          <p class="titleRow">Блюда на приготовление</p>
          <ElementDish v-for="v in leftElements" v-bind:key="v.id" v-bind:data="v" v-bind:updateComponent="updateComponent"/>
        </div>
        <div class="col-12 col-lg-6" v-else>
          <h2>Блюда на приготовление не найдены</h2>
        </div>
        <div class="col-12 col-lg-6" v-if="flagR">
          <p class="titleRow">Блюда в процессе приготовления</p>
          <ElementDish v-for="v in rightElements" v-bind:key="v.id" v-bind:data="v" v-bind:updateComponent="updateComponent"/>
        </div>
        <div class="col-12 col-lg-6" v-else>
          <h2>Блюда в процессе приготовления не найдены</h2>
        </div>
      </div>
      <!-- если их нет, то заглушка -->
      <div v-else>
        <h1>Данные не найдены</h1>
      </div>
    </div>
  </div>
</template>

<script>
import ElementDish from './ElementDish'
import store from '../store/store'

export default {
  name: 'Kitchen',
  props: {
  },
  components: {
    'ElementDish': ElementDish
  },
  data () {
    return {
      elements: [],
      mobile: false,
      leftElements: [],
      rightElements: [],
      flagR: true,
      flagL: true
    }
  },
  methods: {
    filter (search) {
      return this.elements.filter(x => x.dishStatus.title === search)
    },
    windowEvent () {
      this.mobile = window.innerWidth < 960
    },
    updateComponent () {
      this.leftElements = this.filter('В ожидании')
      this.rightElements = this.filter('Готовится')
      this.flagL = this.leftElements.length > 0
      this.flagR = this.rightElements.length > 0
    },
    startRenderPage: function () {
      window.onresize = this.windowEvent
      window.onready = this.windowEvent
      this.$http.get('http://localhost:8079/kitchen').then(response => {
        this.elements = response.body
        this.updateComponent()
        console.log(response.body)
      }).catch(err => {
        console.log(err.status)
        this.elements = []
      })
    }
  },
  created () {
    this.startRenderPage()
  },
  computed: {
    refreshKitchen () {
      if (store.getters.value('refreshKitchen') === true) {
        store.dispatch('setValue', {key: 'refreshKitchen', value: false})
        this.startRenderPage()
      }
      return store.getters.value('refreshKitchen')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  min-height: calc(100vh - 165px);
}
.container {
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.photo img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.titleRow {
  font-size: 28px;
}
.element.recipe-show .recipe {
  display: block;
}
</style>

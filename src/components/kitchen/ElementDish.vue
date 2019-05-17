<template>
  <div class="element" v-if="visible"> <!-- Добавил для своих нужд, хотите - убирайте :) -->
    <div v-on:click="flag=!flag">
      <div class="element-list">
        <div class="photo">
          <img class="photo" :src="`http://localhost:8079` + data.dish.imgUrl">
        </div>
        <div class="name-dish">
          <div class="name category">
            <span> {{data.dish.name}}</span>
          </div>
          <div class="name">
            <span> {{data.dish.typeDish.title}} </span>
          </div>
          <div class="mass">
            <span> {{data.dish.mass}}</span>
          </div>
        </div>
        <div class="btnAndTime">
          <div class="time timeTop">
            <span>{{data.dish.preparingTime}}</span>
          </div>
          <div class="button-block">
            <button class="btn btn-lg btn-success active button" v-bind:class="classElementRecipe"
                    v-on:click="clickRecipeButton(data.id)"> {{recipeStatus}}
            </button>
          </div>
          <div class="time timeBottom">{{waitTitle}} {{waitDateTime}}</div>
        </div>
      </div>
      <div v-if="flag" class="arrow">
        <ion-icon name="ios-arrow-up" v-show="flag"></ion-icon>
      </div>
      <div v-else-if="!flag" class="arrow">
        <ion-icon name="ios-arrow-down"></ion-icon>
      </div>
    </div>
    <div class="recipe" v-show="flag">
      <div class="ingredients-block">
        <div class="ingredient-name title">Ингредиенты</div>
        <div class="ingredient-description">
          <div class="ingredient-list">
            <div v-for="i in data.dish.ingredients" v-bind:key="i.id">
              <p class="ing-item"> {{i.ingredient.name}} - <span style="white-space: nowrap">{{i.quantity}} {{i.ingredient.unit}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="recipe-block">
        <div class="recipe-name title">Рецепт</div>
        <div class="recipe-description" v-html=data.dish.recipe>
          {{data.dish.recipe}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store'
import {sendMessageFromKitchenToStock, sendMessageFromKitchenToWaiter} from '../../utills/ws'

export default {
  name: 'ElementDish',
  props: {
    // removeComponent: () => {}, // втф?
    data: Object, // пропс это хорошо. Если вдруг тебе понадобится таскать какие-то элементы дальше чем из
    // родительского в дочерний загляни в store/store.js
    updateComponent: Function
  },
  // често говоря я хз как выглядит твой элемент ибо я еще не сливал АПИ-шку, позже солью подрехтую, да
  // и вобще наврное придется через бутстрап переписывать =(
  data () {
    console.log(this.data)
    let recipeStatus = ''
    let classElementRecipe = ''
    if (this.data.dishStatus.title === 'В ожидании') {
      recipeStatus = 'ВЗЯТЬ'
      classElementRecipe = 'button-take'
    }
    if (this.data.dishStatus.title === 'Готовится') {
      recipeStatus = 'ОТДАТЬ'
      classElementRecipe = 'button-ready'
    }
    return {
      flag: false,
      recipeStatus: recipeStatus,
      classElementRecipe: classElementRecipe,
      visible: true,
      waitDateTime: null,
      interval: null
    }
  },
  computed: {
    waitTitle: {
      get: function () {
        return this.data.beginCookingTime ? 'Готов: ' : 'Ждет: '
      }
    },
    dateRealNow: {
      get: function () {
        return new Date(this.data.beginCookingTime || this.data.timeOrder)
      },
      set: function (value) {
        this.data.beginCookingTime = value
      }
    }
  },
  created () {
    this.interval = setInterval(() => {
      this.waitDateTime = this.msToTime(new Date() - this.dateRealNow)
    }, 1000)
  },
  methods: {
    clickRecipeButton (dishesFromOrderId) {
      let json
      switch (this.recipeStatus) {
        case 'ВЗЯТЬ':
          this.data.dishStatus.title = 'Готовится'
          this.recipeStatus = 'ОТДАТЬ'
          this.classElementRecipe = 'button-ready'
          json = {'status': 'Готовится', 'id': dishesFromOrderId, 'tableNumber': 2}
          this.dateRealNow = new Date()
          sendMessageFromKitchenToStock()
          break
        case 'ОТДАТЬ':
          this.visible = false
          this.data.dishStatus.title = 'Готово'
          json = {'status': 'Готово', 'id': dishesFromOrderId, 'tableNumber': 2}
          break
        default:
          break
      }
      this.$http.post(store.getters.host + '/kitchen/status-change', JSON.stringify(json)).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
      this.updateComponent()
      sendMessageFromKitchenToWaiter()
    },
    msToTime (duration) {
      // var milliseconds = parseInt((duration % 1000) / 100)
      var seconds = parseInt((duration / 1000) % 60)
      var minutes = parseInt((duration / (1000 * 60)) % 60)
      var hours = parseInt((duration / (1000 * 60 * 60)))

      hours = (hours < 10) ? '0' + hours : hours
      minutes = (minutes < 10) ? '0' + minutes : minutes
      seconds = (seconds < 10) ? '0' + seconds : seconds

      return hours + ':' + minutes + ':' + seconds
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .element {
    border: 1px solid #3F9384;
    margin-bottom: 10px;
  }

  .element-list {
    width: 100%;
    padding: 10px;
    /*margin-bottom: 5px;
    border-top: 2px dotted #3F9384;*/
    display: flex;
  }

  .arrow {
    width: 100%;
    border-bottom: 1px solid #3F9384;
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

  .photo img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .name-dish {
    width: 100%;
    height: 130px;
    padding: 0 10px;
    position: relative;
  }

  .name {
    width: 100%;
    font-size: 26px;
    line-height: 26px;
    text-align: left;
  }

  .category {
    font-weight: bold;
  }

  .mass {
    width: 100%;
    line-height: 20px;
    margin-top: 10px;
    text-align: left;
    font-size: 18px;
  }

  .btnAndTime {
    position: relative;
    display: flex;
  }

  .time {
    position: absolute;
    width: 100%;
    font-size: 22px;
    line-height: 22px;
    text-align: right;
    white-space: nowrap;
  }

  .timeTop {
    top: 0px;
  }

  .timeBottom {
    bottom: 0;
  }

  .button-block {
    align-self: center;
    width: 150px;
  }

  .button {
    font-size: 28px;
    max-width: 140px;
    width: 140px;
    font-weight: 500;
    float: right;
    vertical-align: middle;
  }

  .button-take {
    background-color: #6e819e !important;
  }

  .button-ready {
    background-color: #3F9384 !important;
  }

  .element {
    width: 100%;
  }

  .recipe {
    width: 100%;
    display: flex;
    /*border-top: 1px dotted #3F9384;*/

    padding: 15px 0;
  }

  .ingredients-block {
    width: 30%;
    padding: 0 15px;
    height: auto;
    border-right: 1px dotted #3F9384;
  }

  .recipe-block {
    padding: 0 15px;
    width: 70%;
    height: auto;
  }

  .title {
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 15px;
    color: black;
  }

  .ingredient-list {
    width: 100%;
    display: inline-block;
    float: left;
    margin-bottom: 5px;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
  }

  .recipe-description {
    font-size: 18px;
    line-height: 20px;
    text-align: justify;
  }
  .ing-item {
    margin-bottom: 0;
    text-align: justify;
  }

  @media (max-width: 1200px) {
    .name {
      font-size: 24px;
    }
  }
</style>

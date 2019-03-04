<template>
    <div class="element" v-if="visible"> <!-- Добавил для своих нужд, хотите - убирайте :) -->
        <div class="element-list">
            <div class="photo">
                <img class="photo" :src="`http://localhost:8080` + data.dish.imgUrl">
            </div>
            <div class="name-dish" v-on:click="flag=!flag">
                <div class="name category">
                    <span> {{data.dish.typeDish.title}}</span>
                </div>
                <div class="name">
                    <span> {{data.dish.name}} </span>
                </div>
                <div class="mass">
                    <span> {{data.dish.mass}}</span>
                </div>
                <div class="time">
                    <span></span>
                </div>
            </div>
            <div class="button-block">
                <button class="btn btn-lg btn-success active button" v-bind:class="classElementRecipe" v-on:click="clickRecipeButton(data.dish.id)"> {{recipeStatus}} </button>
            </div>
        </div>
        <div class="recipe" v-show="flag">
            <div class="ingredients-block">
                <div class="ingredient-name title">Ингредиенты</div>
                <div class="ingredient-description">
                    <div class="ingredient-list">
                        <span class="ing-list-name" v-html=data.dish.ingredient> {{data.dish.ingredient}} </span>
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
export default {
  name: 'ElementDish',
  props: {
    // removeComponent: () => {}, // втф?
    data: Object // пропс это хорошо. Если вдруг тебе понадобится таскать какие-то элементы дальше чем из
    // родительского в дочерний загляни в store/store.js
  },
  // често говоря я хз как выглядит твой элемент ибо я еще не сливал АПИ-шку, позже солью подрехтую, да
  // и вобще наврное придется через бутстрап переписывать =(
  data () {
    let recipeStatus = ''
    let classElementRecipe = ''
    if (this.data.dishStatus.title === 'В ожидании') {
      recipeStatus = 'ВЗЯТЬ'
      classElementRecipe = 'button-take'
    }
    if (this.data.dishStatus.title === 'Готовится') {
      recipeStatus = 'ГОТОВО'
      classElementRecipe = 'button-ready'
    }
    return {
      flag: false,
      recipeStatus: recipeStatus,
      classElementRecipe: classElementRecipe,
      visible: true
    }
  },
  methods: { // есть такой пункт как methods, не надо засовывать действие на нажатие в дату
    clickRecipeButton (dishId) {
      let json
      switch (this.recipeStatus) {
        case 'ВЗЯТЬ':
          this.recipeStatus = 'ГОТОВО'
          this.classElementRecipe = 'button-ready'
          json = {'status': 'Готовится', 'id': dishId, 'tableNumber': 2}
          break
        case 'ГОТОВО':
          this.visible = false
          this.classElementRecipe = 'button-take'
          json = {'status': 'Готово', 'id': dishId, 'tableNumber': 2}
          break
        default:
          break
      }
      this.$http.post('http://localhost:8080/kitchen/status-change', JSON.stringify(json)).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.element{
    border: 1px solid #3F9384;
    font-family: "Times New Roman";
}
.element-list {
    width: 100%;
    padding: 10px;
    /*margin-bottom: 5px;
    border-top: 2px dotted #3F9384;*/
    border-bottom: 1px solid #3F9384;
    display: flex;
    font-family: "Times New Roman";
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
.photo img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.name-dish {
    width: 100%;
    height: 130px;
    padding-left: 15px;
    position: relative;
}
.name {
    width: 100%;
    font-size: 30px;
    line-height: 30px;

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
.time {
    width: 100%;
    font-size: 20px;
    text-align: left;
    position: absolute;
    bottom: 0;
}
.button-block {
    align-self: center;
    width: 150px;
}
.button {
    font-size: 30px;
    max-width: 150px;
    width: 150px;
    font-weight: 500;
    float: right;
    vertical-align: middle;
    font-family: "Times New Roman";
}
.button-take{ background-color: #6e819e !important;}
.button-ready{ background-color: #3F9384 !important; }
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
    padding: 0 15px ;
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
    font-family: "Times New Roman";
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
</style>

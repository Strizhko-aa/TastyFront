<template>
  <b-container fluid>
    <notifications group="foo" />
    <div class="title-block">
      <span> Добавление блюда в меню </span>
    </div>
    <div class="addDish">
      <b-row>
        <b-col class="col-sm-12 col-md-6">
          <select class="select input" v-model="model.typeDish">
            <option value="0">Выберите раздел меню</option>
            <option v-bind:value="t.id" v-for="t in typeDish" v-bind:key="t.id">{{t.title}}</option>
          </select>
        </b-col>
        <b-col class="col-sm-12 col-md-6">
          <input type="text" class="input" v-model="model.name" placeholder="Введите название">
        </b-col>
        <b-col cols="col-sm-12 col-md-6">
          <input type="text" class="input" v-model="model.price" placeholder="Введите цену, ₽">
        </b-col>
        <b-col class="col-sm-12 col-md-6">
          <input type="text" class="input" v-model="model.massDish" placeholder="Введите вес, гр">
        </b-col>
        <b-col cols="col-sm-12 col-md-6">
          <input type="text" class="input" v-model="model.preparingTime" placeholder="Введите время приготовления 00:00:00">
        </b-col>
        <b-col class="col-sm-12 col-md-12">
          <textarea class="input textarea" v-model="model.recipe" placeholder="Введите рецепт"></textarea>
        </b-col>
        <b-col class="col-sm-12 col-md-12">
          <textarea class="input textarea" v-model="model.description" placeholder="Введите описание блюда"></textarea>
        </b-col>
        <b-col cols="col-sm-12 col-12" class="text">
          <span>Выберите ингредиенты</span>
        </b-col>
        <b-row class="addIngredient col-12" v-for="dishIngredient in model.dishIngredients" v-bind:key="dishIngredient.id">
          <b-col class="col-sm-6 col-md-6 col-6">
            <select class="select input" v-model="dishIngredient.value">
              <option value="0">Ингредиент</option>
              <option v-bind:value="i.id" name="ingredient" v-for="i in ingredient" v-bind:key="i.ingredient.id">{{i.ingredient.name}}, {{i.ingredient.unit}}</option>
            </select>
          </b-col>
          <b-col cols="col-sm-5 col-md-5 col-4">
            <input type="text" class="input" v-model="dishIngredient.mass" name="massIngredient" placeholder="Вес">
          </b-col>
          <b-col cols="col-sm-1 col-md-1 col-2" class="plus input">
            <ion-icon v-on:click="addIngredient()" name="add-circle"></ion-icon>
            <ion-icon v-on:click="removeIngredient(dishIngredient)" name="remove-circle"></ion-icon>
          </b-col>
        </b-row>
        <b-col cols="col-sm-12 col-12" class="text">
          <span>Выберите изображение блюда</span>
        </b-col>
        <b-col cols="col-12" class="imgLoad">
          <input type="file" class="input" accept="image/*" id="file" @change="previewThumbnail" ><br>
          <img v-show="imageSrc" class="Image-input__image" :src="imageSrc" id="img">
        </b-col>
        <b-col class="col-12">
          <button type="button" class="btn btn-labeled btn-success btnAdd" v-on:click="clickAdd()">
            <span class="btn-label"><ion-icon name="checkmark-circle"></ion-icon></span>Добавить</button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'AddDish',
  data: function () {
    return {
      ingredient: [],
      typeDish: [],
      model: {
        typeDish: 0,
        name: '',
        price: null,
        massDish: null,
        preparingTime: null,
        recipe: '',
        description: '',
        dishIngredients: [{value: 0, mass: null}],
        img: ''
      }
    }
  },
  props: [ 'imageSrc' ],
  created () {
    this.$http.get('http://localhost:8080/admin/addDish/ingredient', {headers: {'Authorization': 'Token ' + this.$cookies.get('token')}}).then(response => {
      this.ingredient = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.ingredient = []
    })
    this.$http.get('http://localhost:8080/admin/addDish/typeDish', {headers: {'Authorization': 'Token ' + this.$cookies.get('token')}}).then(response => {
      this.typeDish = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.typeDish = []
    })
  },
  methods: {
    addIngredient: function () {
      this.model.dishIngredients.push({value: 0, mass: null})
    },
    removeIngredient: function (ingredient) {
      const index = this.model.dishIngredients.indexOf(ingredient)
      if (index >= 0 && this.model.dishIngredients.length > 1) {
        this.model.dishIngredients.splice(index, 1)
      }
    },
    previewThumbnail: function (event) {
      var input = event.target

      if (input.files && input.files[0]) {
        var reader = new FileReader()
        var vm = this
        var model = this.model

        reader.onload = function (e) {
          vm.imageSrc = e.target.result
          model.img = vm.imageSrc
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    clickAdd () {
      this.$http.post('http://localhost:8080/admin/addDishInMenu', JSON.stringify(this.model)).then(function (response) {
        console.log(response)
        if (response.body.id) {
          this.model = {
            typeDish: 0,
            name: '',
            price: null,
            massDish: null,
            preparingTime: null,
            recipe: '',
            description: '',
            dishIngredients: [{value: 0, mass: null}],
            img: ''
          }
          var elem = document.getElementById('img')
          elem.style.display = 'none'
          document.getElementById('file').value = ''
          Vue.notify({
            group: 'foo',
            title: 'Добавление ',
            type: 'success',
            position: 'top center',
            duration: 7000,
            text: 'Блюдо ' + response.body.name + ' успешно добавлено'
          })
        } else {
          Vue.notify({
            group: 'foo',
            title: 'Добавление ',
            type: 'error',
            position: 'top center',
            duration: 7000,
            text: 'Ошибка добавления'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
.title-block {
  font-size: 26px;
}
  .addDish{
    width: 100%;
  }
  .input {
    width: 100%;
    border-radius: 5px;
    margin: 10px 0;
    padding: 1px 0px;
    height: 35px;
    font-size: 18px;
    padding-left: 4px;
  }
  .select {
    height: 35px !important;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    color: #6c757d;
    padding: 0;
  }
  .textarea {
    height: 100px;
    width: 100%;
  }
  .addIngredient {
    width: 100%;
  }
  .text {
    font-size: 20px;
  }
  .plus {
    height: 35px;
    font-size: 20px;
    line-height: 35px;
    text-align: right;
  }
  .btnAdd {
    width: 50%;
    margin: 15px 0;
    font-size: 20px;
    line-height: 20px;
  }
  .imgLoad {
    width: 100%;
  }
  .Image-input__image {
    position: relative;
    padding: 0;
    max-width: 200px;
    border-radius: 10px 0;
    box-shadow: inset 1px 1px 10px 0 rgba(255, 255, 255, .5),
    inset -1px -1px 10px 0 rgba(0, 0, 0, .5),
    2px 2px 5px 0 rgba(0, 0, 0, .5);
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  @media (max-width: 576px) {
  .input {
    font-size: 14px;
  }
}
</style>

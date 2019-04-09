<template>
  <b-container fluid>
    <notifications group="foo" />
    <div class="title-block">
      <span> Стоп-лист </span>
    </div>
    <b-row class="row">
      <div class="col-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <span class="panel-title">Блюда</span>
            <div class="pull-right">
              <span class="clickable filter" data-container="body"><ion-icon name="ios-funnel" v-on:click="showSearch = !showSearch"></ion-icon></span>
            </div>
          </div>
          <div class="panel-body" v-show="showSearch">
            <input type="text" class="form-control" id="dish-table-filter" data-action="filter" data-filters="#ing-table" placeholder="Поиск..." v-on:keyup="tableSearch()" />
          </div>
          <table class="table table-hover" id="dish-table" cellspacing="0">
            <thead>
            <tr>
              <th>#</th>
              <th>Фото</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Цена</th>
              <th>Убрать из меню</th>
              <th> ... </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="dish in dishes" v-bind:key="dish.id">
              <td>{{dish.id}}</td>
              <td>
                <img class="photo" v-bind:src="(dish.imgUrl.substring(0, 4) === 'http') ? dish.imgUrl : require('../../assets/images/' + dish.imgUrl.substring(5, dish.imgUrl.length))" alt="">
              </td>
              <td>
                {{dish.name}} <br>
                ( <span class="ingredients" v-for="ing in dish.ingredients" v-bind:key="ing.id">{{ing.ingredient.name}}<span v-if="ing != dish.ingredients[dish.ingredients.length - 1]">, </span></span> )
              </td>
              <td>{{dish.typeDish.title}}</td>
              <td>{{dish.price}} ₽</td>
              <td>
                <input type="checkbox" v-if="dish.stopList == true" checked>
                <input type="checkbox" v-else>
              </td>
              <td><ion-icon class="icon-table"  name="trash" v-on:click="deleteDish(dish.id)"></ion-icon></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'StopList',
  data: function () {
    return {
      showSearch: false,
      dishes: []
    }
  },
  created () {
    this.$http.get('http://localhost:8080/admin/showDish').then(response => {
      this.dishes = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.dishes = []
    })
  },
  methods: {
    tableSearch () {
      var phrase = document.getElementById('dish-table-filter')
      var table = document.getElementById('dish-table')
      var regPhrase = new RegExp(phrase.value, 'i')
      var flag = false
      for (var i = 1; i < table.rows.length; i++) {
        flag = false
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
          flag = regPhrase.test(table.rows[i].cells[j].innerHTML)
          if (flag) break
        }
        if (flag) {
          table.rows[i].style.display = ''
        } else {
          table.rows[i].style.display = 'none'
        }
      }
    },
    deleteIng (id) {
      this.$http.post('http://localhost:8080/admin/deleteIngredient', JSON.stringify(id)).then(function (response) {
        console.log(response)
        if (response.body === true) {
          const indexElement = this.ingredients.findIndex(x => x.id === id)
          if (indexElement >= 0) {
            this.ingredients.splice(indexElement, 1)
          }
          this.noty('Удаление ', 'success', 'Ингредиент удален')
        } else this.noty('Удаление ', 'error', 'Нельзя удалить ингредиент, так как он используется в блюде(блюдах)')
      }, error => {
        this.noty('Удаление ','error', 'Ошибка удаления')
      }).catch(function (error) {
        console.log(error)
        this.noty('Удаление ', 'error', 'Ошибка удаления')
      })
    },
    noty (title, type, text) {
      Vue.notify({
        group: 'foo',
        title: title,
        type: type,
        position: 'top center',
        duration: 7000,
        text: text
      })
    }
  }
}
</script>

<style scoped>
  .photo {
    position: relative;
    padding: 0;
    height: 50px;
    width: 50px;
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
  .title-block {
    font-size: 26px;
  }
  .clickable{
    cursor: pointer;
    float: right;
    font-size: 16px;
  }
  .clickable.add{
    margin-right: 10px;
  }

  .panel-heading {
    height: 40px;
    background: rgb(63, 147, 132);
    color: white;
    padding: 0 15px;
    line-height: 40px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .panel-title {
    float: left;
    font-size: 22px;
  }
  .panel-body {
    display: flex;
    padding: 15px;
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
  }
  .table {
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }
  .icon-table {
    font-size: 26px;
  }
  .ingredients {
    font-size: 13px;
  }
</style>

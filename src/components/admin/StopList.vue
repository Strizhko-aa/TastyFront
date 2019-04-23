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
              <th><a v-on:click="sortedList('id')"># ⇅</a></th>
              <th>Фото</th>
              <th><a v-on:click="sortedList('title')">Название ⇅</a></th>
              <th><a v-on:click="sortedList('type')">Тип ⇅</a></th>
              <th><a v-on:click="sortedList('price')">Цена ⇅</a></th>
              <th> ... </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="dish in dishes" v-bind:key="dish.id">
              <td  v-bind:class="dish.statusDish">{{dish.id}}</td >
              <td>
                <img class="photo" v-bind:src="(dish.imgUrl.substring(0, 4) === 'http') ? dish.imgUrl : require('../../assets/images/' + dish.imgUrl.substring(5, dish.imgUrl.length))" alt="">
              </td>
              <td class="nameDish">
                {{dish.name}} <br>
                <span v-if="dish.ingredients.length > 0">
                  (<span class="ingredients" v-for="ing in dish.ingredients" v-bind:key="ing.id">{{ing.ingredient.name}}<span v-if="ing != dish.ingredients[dish.ingredients.length - 1]">, </span></span>)
                </span>
              </td>
              <td>{{dish.typeDish.title}}</td>
              <td style="white-space: nowrap;">{{dish.price}} ₽</td>
              <td>
                  <select class="select input" v-model="dish.statusDish" v-on:change="editDishInStopList(dish)">
                    <option v-for="sd in statusDish" v-bind:value="sd.id" v-bind:key="sd.id" >{{sd.value}}</option>
                  </select>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
export default {
  name: 'StopList',
  data: function () {
    return {
      showSearch: false,
      dishes: [],
      statusDish: [],
      model: {
        status: null,
        id: null
      },
      flagSortTitle: 1,
      flagSortPrice: 1,
      flagSortType: 1,
      flagSortId: 1
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
    this.$http.get('http://localhost:8080/admin/showStatusDish').then(response => {
      this.statusDish = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.statusDish = []
    })
  },
  methods: {
    log (string) {
      console.log(string)
    },
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
    editDishInStopList (dish) {
      this.$http.post('http://localhost:8080/admin/editDishInStopList', JSON.stringify(dish)).then(function (response) {
        console.log(response)
        if (response.body.id) {
          if (response.body.statusDish === 'available') this.noty('Статус блюда ', 'success', 'Блюдо ' + dish.name + ' доступно для меню')
          if (response.body.statusDish === 'no_ingredients') this.noty('Статус блюда ', 'success', 'Блюдо ' + dish.name + ' отправлено стоп-лист из-за нехватки ингредиентов')
          if (response.body.statusDish === 'blocked') this.noty('Статус блюда ', 'success', 'Блюдо ' + dish.name + ' заблокировано')
          if (response.body.statusDish === 'deleted') this.noty('Статус блюда ', 'success', 'Блюдо ' + dish.name + ' удалено')
        }
      }, error => {
        this.noty('Статус блюда ', 'error', 'Не удалось изменить статус блюда ' + dish.name)
      }).catch(function (error) {
        console.log(error)
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
    },
    sortedList (param) {
      switch (param) {
        case 'title': if (this.flagSortTitle === 1) { return this.dishes.sort(this.sortByTitle) } else return this.dishes.sort(this.sortByTitle2)
        case 'type': if (this.flagSortType === 1) { return this.dishes.sort(this.sortByType) } else return this.dishes.sort(this.sortByType2)
        case 'id': if (this.flagSortId === 1) { return this.dishes.sort(this.sortById) } else return this.dishes.sort(this.sortById2)
        case 'price': if (this.flagSortPrice === 1) { return this.dishes.sort(this.sortByPrice) } else return this.dishes.sort(this.sortByPrice2)
        default: return this.dishes
      }
    },
    sortByTitle (d1, d2) { this.flagSortTitle = 2; return (d1.name.toLowerCase() > d2.name.toLowerCase()) ? 1 : -1 },
    sortByTitle2 (d1, d2) { this.flagSortTitle = 1; return (d1.name.toLowerCase() < d2.name.toLowerCase()) ? 1 : -1 },
    sortByType (d1, d2) { this.flagSortType = 2; return (d1.typeDish.title.toLowerCase() > d2.typeDish.title.toLowerCase()) ? 1 : -1 },
    sortByType2 (d1, d2) { this.flagSortType = 1; return (d1.typeDish.title.toLowerCase() < d2.typeDish.title.toLowerCase()) ? 1 : -1 },
    sortById (d1, d2) { this.flagSortId = 2; return (d1.id > d2.id) ? 1 : -1 },
    sortById2 (d1, d2) { this.flagSortId = 1; return (d1.id < d2.id) ? 1 : -1 },
    sortByPrice (d1, d2) { this.flagSortPrice = 2; return (d1.price > d2.price) ? 1 : -1 },
    sortByPrice2 (d1, d2) { this.flagSortPrice = 1; return (d1.price < d2.price) ? 1 : -1 }

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

  .select {
    height: 25px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    color: #6c757d;
    padding: 0;
  }
  .input {
    width: auto;
    border-radius: 5px;
    padding: 1px 0px;
    font-size: 15px;
    color: #000000;
    background-color: transparent;
  }
  .available {
    background: #83f587b0;
  }
  .no_ingredients {
    background: #c1e1e7;
  }
  .blocked {
    background: #fee5cb;
  }
  .deleted {
    background: #f0908a;
  }
/*  tr:hover td {
    background: rgba(255,255,255,.5);
  }*/
  .table-hover > tbody > tr:hover {
    background-color: #D2D2D2;
  }
  th {
    white-space: nowrap;
  }
  .nameDish {
    text-align: justify;
  }
</style>

<template>
  <b-container fluid>
    <p hidden>{{refreshAdmin}}{{refreshStocks}}</p>

    <notifications group="foo"/>
    <div class="title-block">
      <span> Запасы ингредиентов </span>
    </div>
    <div v-if="loading">
      <p>///LOADING///</p>
    </div>
    <div v-if="!loading">
      <b-row class="row">
        <div class="col-12">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <span class="panel-title">Ингредиенты</span>
              <div class="pull-right">
              <span class="clickable filter" data-container="body"><ion-icon name="ios-funnel"
                                                                             v-on:click="showSearch = !showSearch"></ion-icon></span>
                <span class="clickable add" data-toggle="tooltip" title="Toggle table filter" data-container="body"><ion-icon
                  name="ios-add-circle" v-on:click="showAddIngredient=!showAddIngredient"></ion-icon></span>
              </div>
            </div>
            <div class="panel-body col-12" v-show="showSearch">
              <b-col cols="3">
                <input type="text" class="form-control inputAdd" v-model="deltaForTomorrowIngredients"
                       oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="Необходимый запас..."/>
              </b-col>
              <b-col cols="5">
                <input type="text" class="form-control" id="ing-table-filter" data-action="filter"
                       data-filters="#ing-table"
                       placeholder="Поиск..." v-on:keyup="tableSearch()"/>
              </b-col>
              <b-col style="text-align: right" cols="4">
                <button class="btn-danger" v-on:click="sortedList('countNoNextDay')">Нужно докупить</button>
                <button class="btn-danger" v-on:click="createPDF()">PDF</button>
              </b-col>
            </div>
            <div class="panel-body col-12" v-show="showAddIngredient">
              <b-col cols="3">
                <input type="text" class="form-control inputAdd" v-model="model.name" placeholder="Название"/>
              </b-col>
              <b-col cols="3">
                <input type="text" class="form-control inputAdd" v-model="model.type" placeholder="Категория"/>
              </b-col>
              <b-col cols="2">
                <select class="select input form-control" v-model="model.unit">
                  <option value="гр">гр</option>
                  <option value="мл">мл</option>
                  <option value="шт">шт</option>
                </select>
              </b-col>
              <b-col cols="2">
                <input type="text" class="form-control inputAdd" v-model="model.price" placeholder="Цена за ед"/>
              </b-col>
              <b-col cols="2">
                <button type="button" class="btn btn-labeled btn-success inputAdd" v-on:click="clickAddIngredient()">
                  <span class="btn-label"><ion-icon name="checkmark-circle"></ion-icon></span>Добавить
                </button>
              </b-col>
            </div>
            <table class="table table-hover" id="ing-table" cellspacing="0">
              <thead>
              <tr>
                <th><a v-on:click="sortedList('id')"># ⇅</a></th>
                <th><a v-on:click="sortedList('title')">Название ⇅</a></th>
                <th><a v-on:click="sortedList('type')">Категория ⇅</a></th>
                <th><a v-on:click="sortedList('count')">Запас ⇅</a></th>
                <th colspan="2"> Редактирование</th>
                <th><a v-on:click="sortedList('countNext')">На завтра ⇅</a></th>
                <th><a v-on:click="sortedList('price')">Цена ⇅</a></th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="i in ingredients" v-bind:key="i.id">
                <td bgcolor="#f0908a"
                    v-if="(i.quantity_in_stock - i.forTomorrow)< (deltaForTomorrowIngredients === '' ? 100 : deltaForTomorrowIngredients) ">
                  {{i.id}}
                </td>
                <td v-else>{{i.id}}</td>

                <td>{{i.name}}</td>
                <td>{{i.type}}</td>
                <td>{{i.quantity_in_stock}} , {{i.unit}}</td>
                <td><input class="form-control mini" type="text" v-model="i.mass" placeholder="Вес"></td>
                <td>
                  <ion-icon class="icon-table" name="add-circle" v-on:click="edit('+', i)"></ion-icon>
                  <ion-icon class="icon-table" name="remove-circle" v-on:click="edit('-', i)"></ion-icon>
                </td>
                <td>{{i.forTomorrow}} , {{i.unit}}</td>
                <td>{{i.price}} <span style="font-size: 18px">₽</span>/{{i.unit}}</td>
                <td>
                  <ion-icon class="icon-table" name="trash" v-on:click="deleteIng(i.id)"></ion-icon>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Vue from 'vue'
import store from '../store/store'

export default {
  name: 'Stock',
  data: function () {
    return {
      deltaForTomorrowIngredients: '100',
      forRecountForPDF: null,
      makeRed: false,
      showSearch: false,
      showAddIngredient: false,
      loading: true,
      ingredients: [],
      forTomorrow: [],
      model: {
        name: '',
        type: '',
        unit: 'гр',
        price: ''
      },
      editModel: {
        id: null,
        mass: null
      },
      flagSortTitle: 1,
      flagSortType: 1,
      flagSortId: 1,
      flagSortCount: 1,
      flagSortCountNext: 1
    }
  },
  created: function () {
    this.startRenderPage()
  },
  computed: {
    delForIngred () {
      return this.deltaForTomorrowIngredients
    },
    refreshAdmin () {
      if (store.getters.value('refreshAdmin') === true) {
        store.dispatch('setValue', {key: 'refreshAdmin', value: false})
        this.startRenderPage()
      }
      return store.getters.value('refreshAdmin')
    },
    refreshStocks () {
      if (store.getters.value('refreshStock') === true) {
        store.dispatch('setValue', {key: 'refreshStock', value: false})
        this.startRenderPage()
      }
      return store.getters.value('refreshStock')
    }
  },
  methods: {
    startRenderPage: function () {
      this.loading = true
      console.log('load')
      this.getIngredientsFromServer()
      // setTimeout( () => this.loading = false, 200)
      this.loading = false
    },
    recountForPDF () {
      this.forTomorrow = []
      this.tmp = []
      for (var i = 0; i < this.forRecountForPDF.length; i++) {
        this.tmp[i] = this.forRecountForPDF[i]['ingredient']
        this.tmp[i].forTomorrow = this.forRecountForPDF[i]['quantityIngredientsForTomorrow']
        if (this.tmp[i].quantity_in_stock - this.tmp[i].forTomorrow < this.deltaForTomorrowIngredients) this.forTomorrow.push(this.tmp[i])
      }
    },
    createPDF () {
      console.log(this.ingredients)
      this.recountForPDF()
      this.$http.post(store.getters.host + '/admin/createPDF', JSON.stringify(this.forTomorrow)).then(function (response) {
        console.log(response)
        var a = document.createElement('a')
        a.href = response.bodyText
        a.target = '_blank'
        a.click()
        console.log(a)
        this.noty('PDF ', 'success', ' успешно')
      }).catch(err => {
        console.log(err.status)
      })
    },
    getIngredientsFromServer: function () {
      this.$http.get(store.getters.host + '/admin/addDish/ingredient').then(response =>
        response.json()).then(json => {
        this.ingredients = []
        this.forRecountForPDF = json
        for (var i = 0; i < json.length; i++) {
          this.ingredients[i] = json[i]['ingredient']
          this.ingredients[i].forTomorrow = json[i]['quantityIngredientsForTomorrow']
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          console.log(this.delForIngred)
          if (this.ingredients[i].quantity_in_stock - this.ingredients[i].forTomorrow < this.delForIngred) this.forTomorrow.push(this.ingredients[i])
        }
      }).catch(err => {
        console.log(err.status)
        this.ingredients = []
      })
    },
    tableSearch () {
      var phrase = document.getElementById('ing-table-filter')
      var table = document.getElementById('ing-table')
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
    clickAddIngredient () {
      this.$http.post(store.getters.host + '/admin/addIngredient', JSON.stringify(this.model)).then(function (response) {
        console.log(response)
        if (response.body.id) {
          this.model = {
            name: '',
            type: '',
            unit: '',
            price: ''
          }
          this.ingredients.push(response.body)
          this.noty('Добавление ', 'success', 'Ингредиент ' + response.body.name + ' успешно добавлен')
        } else {
          this.noty('Добавление ', 'error', 'Ошибка добавления')
        }
      }).catch(function (error) {
        console.log(error)
        this.noty('Добавление ', 'error', 'Ошибка добавления')
      })
    },
    edit (symbol, ingredient) {
      if (ingredient.mass != null) {
        this.editModel.id = ingredient.id
        this.editModel.mass = symbol + ingredient.mass
        this.$http.post(store.getters.host + '/admin/editMassIngredient', JSON.stringify(this.editModel)).then(function (response) {
          console.log(response)
          if (response.body.id) {
            this.noty('Изменение кол-ва ингредента ', 'success', 'Вес ингредиента ' + response.body.name + ' успешно изменен')
            ingredient.quantity_in_stock = response.body.quantity_in_stock
            ingredient.mass = ''
            this.$forceUpdate()
          } else {
            this.noty('Изменение ', 'error', 'Ошибка изменения количества ингредиента')
          }
        }).catch(function (error) {
          console.log(error)
        })
      } else this.noty('Изменение ', 'error', 'Ошибка изменения количества ингредиента')
    },
    deleteIng (id) {
      this.$http.post(store.getters.host + '/admin/deleteIngredient', JSON.stringify(id)).then(function (response) {
        console.log(response)
        if (response.body === true) {
          const indexElement = this.ingredients.findIndex(x => x.id === id)
          if (indexElement >= 0) {
            this.ingredients.splice(indexElement, 1)
          }
          this.noty('Удаление ', 'success', 'Ингредиент удален')
        } else this.noty('Удаление ', 'error', 'Нельзя удалить ингредиент, так как он используется в блюде(блюдах)')
      }, error => {
        this.noty('Удаление ', 'error', 'Ошибка удаления')
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
    },
    sortedList (param) {
      switch (param) {
        case 'title':
          if (this.flagSortTitle === 1) {
            return this.ingredients.sort(this.sortByTitle)
          } else return this.ingredients.sort(this.sortByTitle2)
        case 'type':
          if (this.flagSortType === 1) {
            return this.ingredients.sort(this.sortByType)
          } else return this.ingredients.sort(this.sortByType2)
        case 'id':
          if (this.flagSortId === 1) {
            return this.ingredients.sort(this.sortById)
          } else return this.ingredients.sort(this.sortById2)
        case 'count':
          if (this.flagSortCount === 1) {
            return this.ingredients.sort(this.sortByCount)
          } else return this.ingredients.sort(this.sortByCount2)
        case 'countNext':
          if (this.flagSortCountNext === 1) {
            return this.ingredients.sort(this.sortByCountNext)
          } else return this.ingredients.sort(this.sortByCountNext2)
        case 'countNoNextDay': {
          return this.ingredients.sort(this.sortByCountNoNextDay)
        }
        case 'price':
          if (this.flagSortPrice === 1) {
            return this.ingredients.sort(this.sortByPrice)
          } else return this.ingredients.sort((this.sortByPrice2))

        default:
          return this.ingredients
      }
    },
    sortByTitle (d1, d2) {
      this.flagSortTitle = 2
      return (d1.name.toLowerCase() > d2.name.toLowerCase()) ? 1 : -1
    },
    sortByTitle2 (d1, d2) {
      this.flagSortTitle = 1
      return (d1.name.toLowerCase() < d2.name.toLowerCase()) ? 1 : -1
    },
    sortByType (d1, d2) {
      this.flagSortType = 2
      return (d1.type.toLowerCase() > d2.type.toLowerCase()) ? 1 : -1
    },
    sortByType2 (d1, d2) {
      this.flagSortType = 1
      return (d1.type.toLowerCase() < d2.type.toLowerCase()) ? 1 : -1
    },
    sortById (d1, d2) {
      this.flagSortId = 2
      return (d1.id > d2.id) ? 1 : -1
    },
    sortById2 (d1, d2) {
      this.flagSortId = 1
      return (d1.id < d2.id) ? 1 : -1
    },
    sortByCount (d1, d2) {
      this.flagSortCount = 2
      return (d1.quantity_in_stock > d2.quantity_in_stock) ? 1 : -1
    },
    sortByCount2 (d1, d2) {
      this.flagSortCount = 1
      return (d1.quantity_in_stock < d2.quantity_in_stock) ? 1 : -1
    },
    sortByCountNext (d1, d2) {
      this.flagSortCountNext = 2
      return (d1.forTomorrow > d2.forTomorrow) ? 1 : -1
    },
    sortByCountNext2 (d1, d2) {
      this.flagSortCountNext = 1
      return (d1.forTomorrow < d2.forTomorrow) ? 1 : -1
    },
    sortByCountNoNextDay (d1, d2) {
      return (d1.quantity_in_stock - d1.forTomorrow > d2.quantity_in_stock - d2.forTomorrow) ? 1 : -1
    },
    sortByPrice (d1, d2) {
      this.flagSortPrice = 2
      return (d1.price > d2.price) ? 1 : -1
    },
    sortByPrice2 (d1, d2) {
      this.flagSortPrice = 1
      return (d1.price < d2.price) ? 1 : -1
    }

  }
}
</script>

<style scoped>
  .title-block {
    font-size: 26px;
  }

  .clickable {
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  .clickable.add {
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

  .inputAdd {
    width: 100%;
  }

  .table {
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }

  .mini {
    width: 70px;
    float: right;
  }

  .icon-table {
    font-size: 26px;
  }

  th {
    white-space: nowrap;
  }

  .btn-danger {
    margin-left: 20px;
    height: 38px;
    width: auto;
    white-space: nowrap;
    padding: 5px;
    border-radius: 6px;
    background-color: #f95d54;
    border-color: #f95d54;
  }

</style>

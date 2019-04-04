<template>
  <b-container fluid>
    <notifications group="foo" />
    <div class="title-block">
      <span> Запасы ингредиентов </span>
    </div>
    <b-row class="row">
      <div class="col-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <span class="panel-title">Ингедиенты</span>
            <div class="pull-right">
              <span class="clickable filter" data-container="body"><ion-icon name="ios-funnel" v-on:click="showSearch = !showSearch"></ion-icon></span>
              <span class="clickable add" data-toggle="tooltip" title="Toggle table filter" data-container="body"><ion-icon name="ios-add-circle" v-on:click="showAddIngredient=!showAddIngredient"></ion-icon></span>
            </div>
          </div>
          <div class="panel-body" v-show="showSearch">
            <input type="text" class="form-control" id="ing-table-filter" data-action="filter" data-filters="#ing-table" placeholder="Поиск..." v-on:keyup="tableSearch()" />
          </div>
          <div class="panel-body col-12" v-show="showAddIngredient">
            <b-col cols="3">
              <input type="text" class="form-control inputAdd" v-model="model.name" placeholder="Название" />
            </b-col>
            <b-col cols="3">
              <input type="text" class="form-control inputAdd" v-model="model.type" placeholder="Категория" />
            </b-col>
            <b-col cols="3">
              <input type="text" class="form-control inputAdd" v-model="model.unit" placeholder="Ед. измерения" />
            </b-col>
            <b-col cols="3">
              <button type="button" class="btn btn-labeled btn-success inputAdd" v-on:click="clickAddIngredient()">
                <span class="btn-label"><ion-icon name="checkmark-circle"></ion-icon></span>Добавить</button>
            </b-col>
          </div>
          <table class="table table-hover" id="ing-table" cellspacing="0">
            <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Запас</th>
              <th colspan="2"> Редактирование </th>
              <th>На завтра</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i in ingredients" v-bind:key="i.id">
              <td>{{i.id}}</td>
              <td>{{i.name}}</td>
              <td>{{i.type}}</td>
              <td>{{i.quantity_in_stock}} , {{i.unit}}</td>
              <td><input class="form-control mini" type="text" v-model="i.mass" placeholder="Вес"></td>
              <td>
                <ion-icon class="icon-table" name="add-circle" v-on:click="edit('+', i)"></ion-icon>
                <ion-icon class="icon-table" name="remove-circle" v-on:click="edit('-', i)"></ion-icon>
              </td>
              <td>{{i.quantity_in_stock}} , {{i.unit}}</td>
              <td><ion-icon class="icon-table"  name="trash" v-on:click="deleteIng(i.id)"></ion-icon></td>
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
  name: 'Stock',
  data: function () {
    return {
      showSearch: false,
      showAddIngredient: false,
      ingredients: [],
      model: {
        name: '',
        type: '',
        unit: ''
      },
      editModel: {
        id: null,
        mass: null
      }
    }
  },
  created () {
    this.$http.get('http://localhost:8080/admin/addDish/ingredient').then(response => {
      this.ingredients = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.ingredients = []
    })
  },
  methods: {
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
      this.$http.post('http://localhost:8080/admin/addIngredient', JSON.stringify(this.model)).then(function (response) {
        console.log(response)
        if (response.body.id) {
          this.model = {
            name: '',
            type: '',
            unit: ''
          }
          this.ingredients.push(response.body)
          this.noty('Добавление ', 'success','Ингредиент ' + response.body.name + ' успешно добавлен')
        } else {
          this.noty('Добавление ', 'error', 'Ошибка добавления')
        }
      }, error => {
        this.noty('Добавление ', 'error', 'Ошибка добавления')
      }).catch(function (error) {
        console.log(error)
        this.noty('Добавление ', 'error', 'Ошибка добавления')
      })
    },
    edit (symbol, ingredient) {
      if (ingredient.mass != null) {
        this.editModel.id = ingredient.id
        this.editModel.mass = symbol + ingredient.mass
        this.$http.post('http://localhost:8080/admin/editMassIngredient', JSON.stringify(this.editModel)).then(function (response) {
          console.log(response)
          if (response.body.id) {
            this.noty('Изменение кол-ва ингредента ', 'success', 'Вес ингредиента ' + response.body.name + ' успешно изменен')
            ingredient.quantity_in_stock = response.body.quantity_in_stock
            ingredient.mass = ''
          } else {
            this.noty('Изменение ', 'error', 'Ошибка изменения количества ингредиента')
          }
        }, error => {
          this.noty('Изменение ', 'error', 'Ошибка изменения количества ингредиента')
        }).catch(function (error) {
          console.log(error)
        })
      } else this.noty('Изменение ', 'error', 'Ошибка изменения количества ингредиента')
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

</style>

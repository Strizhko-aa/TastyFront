<template>
  <div class="hello">
    <div class="container">
      <!-- проверка что элементы есть -->
      <div class="row" v-if="elements.length > 0">
        <ElementDish v-for="v in elements" v-bind:key="v.id" v-bind:data="v"/>
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

export default {
  name: 'Kitchen',
  props: {
  },
  components: {
    'ElementDish': ElementDish
  },
  data () {
    return {
      elements: []
    }
  },
  methods: {

  },
  created () {
    // let resource = this.$resource('http://localhost:8080/kitchen');
    // resource.get().then(result => {
    //   result.json().then(data => {
    //     console.log(data);
    //     this.elements = data;
    //   });
    // }, error => {
    //   console.log(error);
    // });

    // чуть изменил запрос просто добавил модуль, vue-resource. По сути весь он находится
    // ниже и читать про него ничего не нужно
    this.$http.get('http://localhost:8081/kitchen').then(response => {
      this.elements = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.elements = []
    })
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
.element.recipe-show .recipe {
  display: block;
}
.container .row {
    display: block;
}
</style>

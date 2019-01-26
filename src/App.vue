<!--<template>
  <div id="app">
    <header class="modal-header">
      <div class="container">
        <div class="row">
        <div class="header-element logo">
          <img class="logo img" src="./assets/images/logo.png">
        </div>
        <div class="header-element title">
          <span>{{whereIsUser}}</span>
        </div>
        <div class="header-element menu">
          <div class="user">
            {{ user ? user.name : 'Loading...' }}
          </div>
          <div class="menu-icon">
            <img src="./assets/images/menu-button.svg" alt="">
          </div>
        </div>
        </div>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="container footer-main">
        <p>@2018 TastyHouse</p>
      </div>
    </footer>
  </div>
</template> -->
<template>
  <div id="app">
    <b-container fluid>
      <b-row style="background-color: #3F9384">
        <b-col cols="2" sm="2">
          <img class="rounded logo" align="right" src="./assets/images/logo.png"/>
        </b-col>
        <b-col cols="8">
          <h1 style="margin-top: 11px" class="text-center title">{{whereIsUser}}</h1>
        </b-col>
        <b-col cols="1" lg="1" md="1" sm="1" class="menu md">
          <div style="margin-top: 1px" class="user">
            {{ user ? user.name : 'Loading...' }}
          </div>
          <div class="menu-icon">
            <img src="./assets/images/menu-button.svg" alt="">
          </div>
        </b-col>
        <b-col cols="0" lg="1" md="1" sm="1"></b-col>
      </b-row>
    </b-container>
    <body>
    <router-view/>
    </body>
    <footer>
      <div class="container">
        <p>@2018 TastyHouse</p>
      </div>
    </footer>
  </div>
</template>

<script>
// import Kitchen from './components/Kitchen.vue'
import store from './components/store/store'

export default {
  name: 'app',
  components: {
    // Kitchen
  },
  data () {
    return {
      user: null
    }
  },
  computed: { // вычисляемое значение. Оно вычисляется при рендере
  // компонента(т.к. это основной компонент то при старте приложения), и при изменении
  // одного из параметров от которого он зависит. В данном случает тут берется значение из хранилища store.
  // Значит, если поменяется хначение в хранилище, то поменяется и значение переменной в компоненте
    whereIsUser () {
      return store.getters.value('whereIsUser')
    }
  },
  created () {
    // Simulate fetching user data.
    setTimeout(() => {
      this.user = { name: 'Alina' }
    }, 2000)
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
.modal-header {
   height: auto !important;
   padding: 0 !important;
 }
  header {
    width: 100%;
    height: 100px;
    background-color: #3F9384;
    display: flex;
    float: left;
  }
  header .container .row {
    flex-wrap: nowrap;
  }
.logo {
  width: 90px;
  height: 90px;
}
  .title{
    width: 100%;
    text-align: center;
    font-size: 50px;
    vertical-align: middle;
    color: #ffffff;
    font-family: Mistral;
  }
  .menu {
    width: auto;
    height: 100px;
    line-height: 100px;
    float: right;
    font-size: 20px;
    color:#ffffff;
    vertical-align: middle;
    display: flex;
    flex-wrap: nowrap;
  }
  .user{
    float: right;
    height: 100px;
    line-height: 100px;
    float: left;
    text-decoration: underline;
    margin-right: 10px;
  }
  .menu-icon {
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }

   .menu-icon img {
    width: 25px;
    height: 25px;
  }

footer {
  background-color: #3F9384;
  width: 100%;
  margin-top: 10px;
  display: inline-block;
  float: left;
  bottom: 0;
  left: 0;
}
footer p {
  font-family: "Times New Roman";
  color: #ffffff;
  float: left;
  line-height: 40px;
}

</style>

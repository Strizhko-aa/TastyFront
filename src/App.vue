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
        <b-col cols="2" md="2" sm="2">
          <img class="rounded logo" align="right" src="./assets/images/logo.png" alt="logo"/>
        </b-col>
        <b-col cols="8" md="8" sm="8">
          <h1 style="margin-top: 11px" class="text-center title">{{whereIsUser}}</h1>
        </b-col>
        <b-col cols="2" md="2" sm="2" class="menu md">
          <div style="margin-top: 1px" class="user">
            {{ user ? user.name : 'Loading...' }}
          </div>
          <!-- <div> -->
            <b-dropdown id="ddown-right" right variant="link" class="m-md-2 btn-drop-menu" no-caret>
                <template slot="button-content">
                  <div class="menu-icon">
                  <img src="./assets/images/menu-button.svg" alt="">
                  </div>
                </template>
              <b-dropdown-item-button @click.native="logout()" class="dropdown-style">Выйти</b-dropdown-item-button>
            </b-dropdown>
          <!-- </div> -->
        </b-col>
        <!-- <b-col cols="0" md="0" sm="0"></b-col> -->
      </b-row>
    </b-container>
    <b-container class="section">
      <router-view/>
    </b-container>
    <footer>
      <div class="container">
        <p>@2018-2019 TastyHouse</p>
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
      user: null,
      result: ''
    }
  },
  methods: {
    logout: function () {
      let _url = 'http://localhost:8080/logout'
      this.$http.post(_url, JSON.stringify('logout')).then(response =>
        response.json()).then(json => {
        this.result = json
      }).catch(error => {
        console.log('logout' + ' ' + error)
      })
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
      this.user = { name: 'Guest' }
    }, 2000)
  }
}

</script>

<style>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: space-between;
  min-height: 100vh;
  padding-bottom: 60px;
}
.modal-header {
   height: auto !important;
   padding: 0 !important;
 }
 .btn-drop-menu {
   float: right;
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
  .dropdown-style {
    height: auto;
    line-height: initial;
    float: right;
    font-size: 20px;
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
.section {
  margin: 25px auto;
  min-height: calc( 100vh - 220px);
}

footer {
  background-color: #3F9384;
  width: 100%;
  display: inline-block;
  float: left;
  position: absolute;
  bottom: 0;
  left: 0;
}
footer p {
  color: #ffffff;
  float: left;
  line-height: 40px;
}

</style>

<template>
  <div id="app">
    <b-container fluid>
      <br>
      <b-row>
        <b-col cols="4"></b-col>
          <b-col>
            <div></div>
            <div class="mt-3">
              <b-form-input v-model="username"
                            type="text"
                            placeholder="Введите логин"></b-form-input>
            </div>
            <div class="mt-3">
              <b-form-input v-model="password"
                            type="password"
                            placeholder="Введите пароль"></b-form-input>
            </div>
            <b-button @click="loginIn()" name="enter" style="width: 100%; margin-top: 20px;" size="lg" variant="success">Войти</b-button>
            <div class="mt-3">
              <b-checkbox class="float-left">Запомнить</b-checkbox>
              <a href="/getpassword" class="float-right">Забыли пароль?</a>
            </div>
            <div class="mt-5">
              <a href="/registration">Еще не зарегистрированы?</a>
            </div>
            <h2 class="mt-3">Вход через соцсети</h2>
            <div>
              <img alt="VK" src="">
              <img alt="Google" src="">
              <img alt="Facebook" src="">
            </div>
          </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '../store/store'
export default {
  data () {
    return {
      username: '',
      password: '',
      result: '',
      elements: []
    }
  },
  methods: {
    loginIn: function () {
      let _url = store.getters.host + '/login'
      let _json = {'username': this.username, 'password': this.password}
      this.$http.post(_url, JSON.stringify(_json)).then(response => {
        this.elements = response.body
      }).catch(err => {
        console.log(err.status)
        this.elements = []
      })
      console.log('login:')
      console.log(this.elements)
    }
  },
  created () {
    let _url = store.getters.host + '/login'
    this.$http.get(_url).then(response => {
      this.elements = response.body
    }).catch(err => {
      console.log(err.status)
      this.elements = []
    })
    console.log('created:')
    console.log(this.elements)
  }
}
</script>

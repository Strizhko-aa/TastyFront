<template>
  <div id="app">
    <b-container fluid>
      <br>
      <b-row>
        <b-col cols="4"></b-col>
        <b-col>
          <div></div>
          <div class="mt-3">
            <b-form-input v-model="name"
                          type="text"
                          placeholder="Введите имя"></b-form-input>
          </div>
          <div class="mt-3">
            <b-form-input v-model="surname"
                          type="text"
                          placeholder="Введите фамилию"></b-form-input>
          </div>
          <div class="mt-3">
            <b-form-input v-model="email"
                          type="text"
                          placeholder="Введите email"></b-form-input>
          </div>
          <div class="mt-3">
            <b-form-input v-model="phone"
                          type="number"
                          placeholder="Введите телефон"></b-form-input>
          </div>
          <div class="mt-3">
            <b-form-input v-model="username"
                          type="text"
                          placeholder="Введите логин"></b-form-input>
          </div>
          <div class="mt-3">
            <b-form-input v-model="password"
                          type="text"
                          placeholder="Введите пароль"></b-form-input>
          </div>
          <b-button @click="loginIn()" name="enter" style="width: 100%; margin-top: 20px;" size="lg" variant="success">Войти</b-button>
          <div class="mt-3">
            <a href="/login">Уже зарегистрированы?</a>
          </div>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
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
      let _url = 'http://localhost:8080/login'
      // var _type = {
      //   'username': this.username,
      //   'login': this.login
      // }
      this.$http.get(_url).then(response => {
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
    let _url = 'http://localhost:8080/login'
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

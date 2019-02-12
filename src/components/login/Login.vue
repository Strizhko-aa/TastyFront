<template>
  <div id="app">
    <b-container fluid>
      <br>
      <b-row>
        <b-col cols="4"></b-col>
          <b-col>
            <h2>Логин</h2>
            <div>
              <b-form-input v-model="username"
                            type="text"
                            placeholder="Введите логин"></b-form-input>
            </div>
            <h2 style="margin-top: 10px">Пароль</h2>
            <div>
              <b-form-input v-model="password"
                            type="password"
                            placeholder="Введите пароль"></b-form-input>
            </div>
            <b-button @click="loginIn()" name="enter" style="width: 100%; margin-top: 20px;" size="lg" variant="success">Войти</b-button>
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
      result: ''
    }
  },
  methods: {
    loginIn: function () {
      let _url = 'http://localhost:8080/login'
      var _type = {
        'username': this.username,
        'login': this.login
      }
      this.$http.post(_url, JSON.stringify(_type)).then(response =>
        response.json()).then(json => {
        this.result = json
      }).catch(error => {
        console.log(_type + ' ' + error)
      })
    }
  }
}
</script>

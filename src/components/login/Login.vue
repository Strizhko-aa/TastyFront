<template>
  <div id="app">
    <b-container fluid>
      <br>
      <b-row>
        <b-col cols="4"></b-col>
          <b-col @submit.prevent="loginIn">
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
import userStore from '../store/userStore'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginIn: function () {
      let _url = 'http://localhost:8080/token'
      let _json = {
        'login': this.username,
        'password': this.password
      }
      this.$http.post(_url, JSON.stringify(_json)).then(response => {
        console.log(response)
        this.$cookies.set('token', response.body[0])
        this.$http.headers.common['Authorization'] = 'Token' + response.body[0]
        this.setUserData(response.body[1])
        if (response.body[1].roleStaff.id === 1) {
          this.$router.push({name: 'waiter'})
        }
        if (response.body[1].roleStaff.id === 2) {
          this.$router.push({name: 'kitchen'})
        }
        if (response.body[1].roleStaff.id === 3) {
          this.$router.push({name: 'admin'})
        }
        if (response.body[1].roleStaff.id === 4) {
          this.$router.push({name: 'menu'})
        }
      }).catch(err => {
        userStore.dispatch('setValue', {key: 'authorized', value: false})
        this.$http.headers.common['Authorization'] = ''
        console.log(err.status)
      })
    },
    setUserData (data) {
      userStore.dispatch('setValue', {key: 'authorized', value: true})
      userStore.dispatch('setValue', {key: 'email', value: data.email})
      userStore.dispatch('setValue', {key: 'firstName', value: data.firstName})
      userStore.dispatch('setValue', {key: 'lastName', value: data.lastName})
      userStore.dispatch('setValue', {key: 'phone', value: data.phone})
      userStore.dispatch('setValue', {key: 'roleStaff["id"]', value: data.roleStaff.id})
      userStore.dispatch('setValue', {key: 'roleStaff["title"]', value: data.roleStaff.title})
      userStore.dispatch('setUserPermission', data.roleStaff.id)
    }
  }
  // created () {
  //   let _url = 'http://localhost:8080/login'
  //   this.$http.get(_url).then(response => {
  //     this.elements = response.body
  //   }).catch(err => {
  //     console.log(err.status)
  //     this.elements = []
  //   })
  // }
}
</script>

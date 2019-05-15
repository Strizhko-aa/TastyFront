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
    <b-button @click="logIn()" name="enter" style="width: 100%; margin-top: 20px;" size="lg" variant="success">Войти</b-button>
    <div class="mt-3">
    <!-- <b-checkbox class="float-left">Запомнить</b-checkbox>
    <a href="/getpassword" class="float-right">Забыли пароль?</a>
    </div>
    <div class="mt-5">
    <a href="/registration">Еще не зарегистрированы?</a>
    </div>
    <h2 class="mt-3">Вход через соцсети</h2>
    <div>
    <img alt="VK" src="">
    <img alt="Google" src="">
    <img alt="Facebook" src="">  -->
    </div>
    </b-col>
    <b-col cols="4"></b-col>
    </b-row>
    <!-- <form >
      <input v-model="username" type="text" name="username" placeholder="логин"><br>
      <input v-model="password" type="password" name="password" id="" placeholder="пароль">
      <button type="submit"> SEND </button>
    </form>
    <b-button variant="success" @click="logIn()">Войти</b-button> -->
  </b-container>
  </div>
</template>

<script>
import userStore from '../store/userStore'
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
    logIn() {
      let _data = '?username=' + this.username + '&password=' + this.password
      this.$http.post('http://localhost:8079/login' + _data).then(async function (response) {
        // console.log(response)
        if (response.status === 200) {
          // this.$http.get('http://localhost:8079/get_user_data').then((response) => {
          //   console.log(response.body)
          // }).catch(err => {
          //   console.log(err)
          // })
          await this.initUserMix()
          console.log('Роль пользователя: ' + userStore.state.roleStaff)
          switch (userStore.state.roleStaff) {
            case 'COOK':
              this.$router.push({name: 'kitchen'})
              break
            case 'ADMIN':
              this.$router.push({name: 'admin'})
              break
            case 'WAITER':
              this.$router.push({name: 'waiter'})
              break

            default:
              this.$router.push('/')
              break
          }
          console.log('Данные пользователя: ' + response)
          // alert('Не верные логин или пароль')
        }
      }).catch(async function (err) {
        if (err.status === 403) {
          await this.initUserMix()
          console.log(userStore.state.roleStaff)
          switch (userStore.state.roleStaff) {
            case 'COOK':
              this.$router.push({name: 'kitchen'})
              break
            case 'ADMIN':
              this.$router.push({name: 'admin'})
              break
            case 'WAITER':
              this.$router.push({name: 'waiter'})
              break

            default:
              this.$router.push('/')
              break
          }
        }
        console.log(err)
      })
    }
  }
}
</script>

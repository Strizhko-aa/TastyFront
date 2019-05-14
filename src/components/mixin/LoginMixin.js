import store from '../store/store'
import userStore from '../store/userStore'

export default {
  data () {
    return {
      dataMix: []
    }
  },
  methods: {
    logoutMix () {
      let _url = store.getters.host + '/logout'
      this.$http.get(_url).then(response => {
        console.log(response)
        store.dispatch('clearStore')
        userStore.dispatch('clearStore')
        this.$cookies.get('JSESSIONID')
        this.$router.push({name: 'login'})
      }).catch(err => {
        console.log(err)
      })
    },
    initUserMix () {
      return new Promise(resolve => {
        let _url = store.getters.host + '/get_user_data'
        this.$http.get(_url).then((response) => {
          // console.log(response.body)
          this.setUserData(response.body)
          userStore.dispatch('setValue', {key: 'authorized', value: true})
          resolve(true)
        }).catch(err => {
          console.log(err)
          userStore.dispatch('setValue', {key: 'authorized', value: false})
          resolve(false)
        })
      })
    },
    setUserData (data) {
      userStore.dispatch('setValue', {key: 'userName', value: data.username})
      userStore.dispatch('setValue', {key: 'roleStaff', value: data.authorities[0].authority})
      userStore.dispatch('setUserPermission', data.authorities[0].authority)
      console.log(userStore.state)
    }
  }
}

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
    setUserData (data) {
      userStore.dispatch('setValue', {key: 'userName', value: data.username})
      userStore.dispatch('setUserPermission', data.authorities[0].authority)
    }
  }
}

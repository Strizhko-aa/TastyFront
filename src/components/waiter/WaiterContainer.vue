<template>
<div class="main-block">
  <div class="waiter-menu-block">
    <waiter-menu></waiter-menu>
  </div>

  <b-container fluid id="content">
    <div v-if="selectedInWaiterMenu === 'tables'">
      <waiter-tables></waiter-tables>
    </div>

    <div v-else-if="selectedInWaiterMenu === 'ready'">
      <waiter-ready></waiter-ready>
    </div>

    <div v-else-if="selectedInWaiterMenu === 'needPay'">
      <need-pay></need-pay>
    </div>
  </b-container>
</div>
</template>

<script>
import WaiterMenu from './WaiterMenu'
import store from '../store/store'
import WaiterTables from './WaiterTables'
import WaiterAllRady from './WaiterAllRady'
import NeedPay from './NeedPay'

export default {
  components: {
    'waiter-menu': WaiterMenu,
    'waiter-tables': WaiterTables,
    'waiter-ready': WaiterAllRady,
    'need-pay': NeedPay
  },
  data () {
    return {

    }
  },
  computed: {
    selectedInWaiterMenu () {
      return store.getters.value('selectedInWaiterMenu')
    }
  }
}
</script>

<style scoped>

</style>

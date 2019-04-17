<template>
  <b-container fluid id="menu">
    <b-row>
      <b-col offset=2 offset-sm=2 offset-md=2 offset-lg=2></b-col>
      <b-col cols="8" sm=8 md=8 lg=8 class="text-center">
        <b-form-group>
          <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="md" buttons button-variant="outline-success" name="radioTime">
          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <b-col offset=2 offset-sm=2 offset-md=2 offset-lg=2></b-col>
    </b-row>
  </b-container>
</template>

<script>
import store from '../store/store'

export default {
  data () {
    return {
      selected: 'tables',
      options: [
        {text: 'Столики', value: 'tables'},
        {text: 'Нужно отнести(24)', value: 'ready'},
        {text: 'Ждет оплаты(2)', value: 'needPay'}
      ]
    }
  },
  watch: {
    selected (newVal, oldVal) {
      store.dispatch('setValue', {key: 'selectedInWaiterMenu', value: newVal})
    }
  }
}
</script>

<style scoped>

</style>

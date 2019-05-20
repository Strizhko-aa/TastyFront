<template>
  <b-container fluid id="menu">
    <b-row>
<!--      <b-col offset=2 offset-sm=2 offset-md=2 offset-lg=2></b-col>-->
      <b-col cols="2"></b-col>
      <b-col cols="8" sm=8 md=8 lg=8 class="text-center">
        <b-form-group>
          <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="md" buttons button-variant="success" name="radioTime">
          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <b-col cols="2"></b-col>

      <!--      <b-col offset=2 offset-sm=2 offset-md=2 offset-lg=2></b-col>-->
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
        {text: 'Нужно отнести', value: 'ready'}
        // {text: 'Ждет оплаты', value: 'needPay'}
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

<style>
  .section.container {
    margin-top: 0;
  }
  .b-form-group {
    margin-bottom: 0;
  }
  .bordered {
    border-radius: 10px 10px;
    border: 3px solid #3F9384;
    margin-bottom: 10px;
  }
  .btn-success {
    background-color: #3F9384;
    border: 3px solid #ffffff;
  }
  .active {
    background-color: #387166 !important;
    border: 3px solid #ffffff !important;;
  }
  .btn-success:hover{
    background-color: rgba(71, 143, 132, 0.56) !important;
    border: 3px solid #ffffff !important;;
  }
  /* все стили что были остались в App.vue (это полоска сверху и футер), так что не удивляйся их исчезновению.*/
  /* И да, я не подгонял еще твои блоки под моюильны разрешения */
</style>

<style scoped>

</style>

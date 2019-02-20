<template>
  <b-container fluid>
    <b-row>
      <b-col col="12" sm="12" md="12" v-for="item in ordered" :key="item.dish.id">
        {{item.dish.name}}: {{item.count}}
        <b-col cols="12" sm="3" md="3" class="quantity">
          <!-- <div class="quantity-input">
            <button class="minus btn-Q" @click="changeCount(item, -1)">-</button>
            <input id="text_tribulus_1" :value="purchased[findPurshasedIndex(item.id)].count" class="input-text qty text" size="3"/>
            <button class="plus btn-Q" @click="changeCount(item, 1)">+</button>
          </div> -->
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import menuStore from './menuStore'

export default {
  data () {
    return {

    }
  },

  computed: {
    ordered () {
      return menuStore.getters.value('purchased')
    }
  }
}
</script>

<style scoped>

</style>

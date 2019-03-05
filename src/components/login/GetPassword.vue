<template>
  <div id="app">
    <b-container fluid>
      <br>
      <b-row>
        <b-col cols="4"></b-col>
        <b-col>
          <h3>Введите email, с которого вы входили в систему</h3>
          <div class="mt-3">
            <b-form-input v-model="email"
                          type="text"
                          placeholder="Введите email"></b-form-input>
          </div>
          <b-button name="getpassword" style="width: 100%; margin-top: 20px;" size="lg" variant="success">Получить пароль</b-button>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'GetPassword'
}
</script>

<style scoped>

</style>

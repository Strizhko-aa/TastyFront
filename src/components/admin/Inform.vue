<template>
  <div>
    <br>
      <b-container fluid>
        <b-row>
          <b-col cols="2">
            <b-form-select v-model="selected" class="mb-3" :select-size="8">
              <optgroup label="Салаты">
                <option value="1">Цезарь</option>
                <option value="2">Обычный</option>
              </optgroup>
              <optgroup label="Супы">
                <option value="3">Борщь</option>
                <option value="4">Свекольник</option>
              </optgroup>
            </b-form-select>
            <div>Selected: <strong>{{ selected }}</strong></div>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null
    }
  }
}
</script>

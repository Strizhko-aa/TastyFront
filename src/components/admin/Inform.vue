<template>
  <div>
    <br>
      <b-container fluid>
        <b-row>
          <b-col cols="5">
            <b-form-select v-model="selected" :options="options" class="mb-3" :select-size="15">
              <optgroup v-for="(group, name) in optionGroups" :label="name">
                <option v-for="option in group" :value="option.value">
                  {{ option.text }}
                </option>
              </optgroup>
            </b-form-select>
          </b-col>
          <b-col>
            <div style="text-align: left; font-size: 22px;">
              <label><strong>{{information.type}}</strong></label><br>
              <label>{{information.name}}</label><br>
              <img align="left" class="leftimg" style="height: 230px; width: 230px; margin-right: 15px" :src="`http://localhost:8080` + information.img"/>
              <!--<label>Описание: {{information.description}}</label><br>-->
              <label>Цена: {{information.price}} рублей</label><br>
              <!--<label v-html="information.ingredient">{{information.ingredient}}</label>-->
              <label style="margin-top: 60px;">Масса: {{information.mass}}</label>
              <label style="margin-top: 60px;">Время приотовл-я: {{information.time}} минут</label>
            </div>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      temp: null,
      optionGroups: null,
      information: {
        name: null,
        img: null,
        description: null,
        ingredient: null,
        mass: null,
        recipe: null,
        time: null,
        type: null,
        price: null
      }
    }
  },
  methods: {
    postToServer: function () {
    }
  },
  created: function () {
    let _url = 'http://localhost:8080/admin/inform'
    this.$http.get(_url).then(response => {
      this.optionGroups = response.body
    })
  },
  watch: {
    selected: function (val) {
      let _url = 'http://localhost:8080/admin/inform'
      const req = {'needDish': this.selected}
      this.$http.post(_url, JSON.stringify(req)).then(response =>
        response.json()).then(json => {
        this.information.description = json['description']
        this.information.ingredient = json['ingredient']
        this.information.mass = json['mass']
        this.information.name = json['name']
        this.information.img = json['img']
        this.information.recipe = json['recipe']
        this.information.time = json['time']
        this.information.type = json['type']
        this.information.price = json['price']
        console.log(this.information)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { Vue, Component} from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
  
}
</script>

<style lang="scss">
body {
  margin: 0
}
.avue-upload__avatar {
  height: auto !important
}
</style>

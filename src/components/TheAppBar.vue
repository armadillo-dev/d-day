<template>
  <v-app-bar
    app
    dark
    class="primary"
  >
    <v-toolbar-title class="AppBar--logo">
      <router-link to="/" class="white--text">
        D-days
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-switch
      :input-value="isDarkMode"
      hide-details
      @change="onToggleTheme"
    >
      <template #label>
        <v-icon>brightness_3</v-icon>
      </template>
    </v-switch>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ActionTypes, GetterTypes, moduleName } from '@/stores/setting'
import Theme from '@/types/enums/Theme'

const SettingStore = namespace(moduleName)

@Component
export default class TheAppBar extends Vue {
  @SettingStore.Getter(GetterTypes.GetTheme)
  theme?: Theme

  @SettingStore.Action(ActionTypes.UpdateTheme)
  updateTheme

  get isDarkMode () {
    return this.theme === Theme.Dark
  }

  onToggleTheme (isDarkMode: boolean): void {
    this.updateTheme(isDarkMode ? Theme.Dark : Theme.Light)
    this.$vuetify.theme.dark = isDarkMode
  }
}
</script>

<style lang="scss">
  .AppBar--logo {
    a {
      text-decoration: none;
    }
  }
</style>

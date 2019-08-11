<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheAppBar from '@/components/TheAppBar.vue'
import { namespace } from 'vuex-class'
import {
  ActionTypes as SettingActionTypes,
  GetterTypes as SettingGetterTypes,
  moduleName as settingModuleName
} from '@/stores/setting'
import {
  ActionTypes as DDaysActionTypes,
  moduleName as dDaysModuleName
} from '@/stores/dDays'
import Theme from '@/types/enums/Theme'

const settingStore = namespace(settingModuleName)
const dDaysStore = namespace(dDaysModuleName)

@Component({
  components: {
    TheAppBar
  }
})
export default class App extends Vue {
  @settingStore.Getter(SettingGetterTypes.GetTheme)
  theme

  @settingStore.Action(SettingActionTypes.FetchTheme)
  fetchTheme

  @dDaysStore.Action(DDaysActionTypes.FetchDDays)
  fetchDDays

  mounted () {
    this.fetchTheme()
    this.fetchDDays()
    this.$vuetify.theme.dark = this.theme === Theme.Dark
  }
}
</script>

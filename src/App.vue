<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <router-view />
    </v-content>
    <v-snackbar
      v-model="isShowFeedbackMessage"
      :timeout="2000"
    >
      {{ feedbackMessage }}
      <v-btn
        color="primary"
        text
         @click="onClickHideFeedbackMessage">
        Close
      </v-btn>
    </v-snackbar>
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
import eventBus from '@/plugins/eventBus'
import Theme from '@/types/enums/Theme'
import EventBusEvent from '@/types/enums/EventBusEvent'
import { ShowFeedbackMessagePayload } from '@/types/interfaces/EventBusPayload'

const settingStore = namespace(settingModuleName)
const dDaysStore = namespace(dDaysModuleName)

@Component({
  components: {
    TheAppBar
  }
})
export default class App extends Vue {
  @settingStore.Getter(SettingGetterTypes.GetTheme)
  theme: Theme

  @settingStore.Action(SettingActionTypes.FetchTheme)
  fetchTheme: () => void

  @dDaysStore.Action(DDaysActionTypes.FetchDDays)
  fetchDDays: () => void

  isShowFeedbackMessage: boolean = false
  feedbackMessage: string = ''

  created (): void {
    eventBus.$on(EventBusEvent.ShowFeedbackMessage, this.showFeedbackMessage)
  }

  beforeDestroy (): void {
    eventBus.$off(EventBusEvent.ShowFeedbackMessage, this.showFeedbackMessage)
  }

  mounted (): void {
    this.fetchTheme()
    this.fetchDDays()
    this.$vuetify.theme.dark = this.theme === Theme.Dark
  }

  showFeedbackMessage ({ message }: ShowFeedbackMessagePayload) : void {
    this.isShowFeedbackMessage = true
    this.feedbackMessage = message
  }

  onClickHideFeedbackMessage (): void {
    this.isShowFeedbackMessage = false
  }
}
</script>

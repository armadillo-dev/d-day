<template>
  <v-container fluid grid-list-md>
    <v-row wrap>
      <d-day-list-item
        v-for="dDay in dDays"
        :key="dDay.id"
        :d-day="dDay"
        @click:remove="onClickRemove"
        @click:reset="onClickReset"
      />
    </v-row>
    <v-btn
      fab
      color="accent"
      fixed
      absolute
      bottom
      right
      link
      to="/add"
      class="DDayList--btn"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import DDayListItem from './DDayListItem.vue'
import DDay from '../types/interfaces/DDay'
import { ActionTypes, GetterTypes, moduleName } from '@/stores/dDays'
import eventBus from '@/plugins/eventBus'
import EventBusEvent from '@/types/enums/EventBusEvent'
import { ShowFeedbackMessagePayload } from '@/types/interfaces/EventBusPayload'

const dDayStore: BindingHelpers = namespace(moduleName)

@Component({
  components: {
    DDayListItem
  }
})
export default class DDayList extends Vue {
  @dDayStore.Getter(GetterTypes.GetDDays)
  dDays?: DDay[]

  @dDayStore.Action(ActionTypes.ResetDDay)
  resetDDay: (dDay: DDay) => void

  @dDayStore.Action(ActionTypes.RemoveDDay)
  removeDDay: (dDay: DDay) => void

  onClickRemove (dDay: DDay): void {
    this.removeDDay(dDay)
    this.showFeedbackMessage(`Remove ${dDay.title}`)
  }

  onClickReset (dDay: DDay): void {
    this.resetDDay(dDay)
    this.showFeedbackMessage(`Reset ${dDay.title}`)
  }

  showFeedbackMessage (message: string): void {
    const feedbackMessagePayload: ShowFeedbackMessagePayload = { message }
    eventBus.$emit(EventBusEvent.ShowFeedbackMessage, feedbackMessagePayload)
  }
}
</script>

<style lang="scss">
  .DDayList--btn {
    bottom: 16px !important;
  }
</style>

<template>
  <v-container fluid grid-list-md>
    <v-layout wrap class="ma-2">
      <d-day-list-item
        v-for="dDay in dDays"
        :key="dDay.id"
        :d-day="dDay"
        @click:remove="onClickRemove"
        @click:reset="onClickReset"
      />
    </v-layout>
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
import DDayListItem from './DDayListItem.vue'
import DDay from '../types/interfaces/DDay'
import { ActionTypes, GetterTypes, moduleName } from '@/stores/dDays'

const dDayStore = namespace(moduleName)

@Component({
  components: {
    DDayListItem
  }
})
export default class DDayList extends Vue {
  @dDayStore.Getter(GetterTypes.GetDDays)
  dDays?: DDay[]

  @dDayStore.Action(ActionTypes.ResetDDay)
  resetDDay

  @dDayStore.Action(ActionTypes.RemoveDDay)
  removeDDay

  onClickRemove (dDay: DDay): void {
    this.removeDDay(dDay)
  }

  onClickReset (dDay: DDay): void {
    this.resetDDay(dDay)
  }
}
</script>

<style lang="scss">
  .DDayList--btn {
    bottom: 16px !important;
  }
</style>

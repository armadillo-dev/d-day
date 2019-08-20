<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h4>{{ dDay.title }}({{ formattedDayCount }})</h4>
      </v-card-title>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="item in futureDDays"
          :key="item.title"
        >
          <v-list-item-content>{{ item.title }}</v-list-item-content>
          <v-list-item-content>{{ item.value }}</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn
          text
          link
          to="/"
          color="primary"
        >
          Back to list
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import { GetterTypes, moduleName } from '@/stores/dDays'
import DDay from '@/types/interfaces/DDay'
import { addDate, formatDate, dateDifference } from '@/utils/dateUtils'

const dDayStore: BindingHelpers = namespace(moduleName)

@Component
export default class DDayDetail extends Vue {
  @Prop({ type: String, required: true })
  id

  @dDayStore.Getter(GetterTypes.GetDDay)
  getDDay: (id: string) => DDay

  dDay: DDay = null

  get dayCount (): number {
    return dateDifference(this.dDay.date, formatDate(new Date()))
  }

  get formattedDayCount (): string {
    if (this.dayCount > 0) {
      return `D+${this.dayCount}`
    } if (this.dayCount < 0) {
      return `D${this.dayCount}`
    }
    return 'D-day!'
  }

  get futureDDays () {
    const futureDays = [0, 10, 30, 50, 100]
    return futureDays.map(day => ({
      title: `+${day}`,
      value: addDate(this.dDay.date, day)
    }))
  }

  created () {
    this.dDay = this.getDDay(this.id)
  }
}
</script>

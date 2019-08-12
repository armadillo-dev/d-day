<template>
  <v-flex xs12>
    <v-card outlined>
      <v-card-title>
        <strong class="display-2">{{ formattedDayCount }}</strong>
        <v-spacer />
        <v-menu offset-y>
          <template #activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="onClickRemove">
              <v-list-item-title>Remove</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ dDay.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ dDay.date }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn text color="primary">
          Detail
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="onClickReset"
        >
          Reset
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import DDay from '@/types/interfaces/DDay'
import { dateDifference, formatDate } from '@/helpers/dateHelper'

@Component
export default class DDayListItem extends Vue {
    @Prop({ type: Object, required: true })
    private readonly dDay!: DDay;

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

    @Emit('click:reset')
    onClickReset (): DDay {
      return this.dDay
    }

    @Emit('click:remove')
    onClickRemove (): DDay {
      return this.dDay
    }
}
</script>

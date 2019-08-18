<template>
  <v-container fluid grid-list-lg>
    <v-form ref="form" v-model="isValid">
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="title"
            label="Title"
            required
            :rules="titleRules"
          />
        </v-flex>
        <v-flex>
          <v-dialog
            ref="dialog"
            v-model="isShownDialog"
            :return-value.sync="date"
            persistent
            full-width
            width="290px"
          >
            <template #activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date"
                readonly
                required
                :rules="dateRules"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="onClickCloseDatepicker">Cancel</v-btn>
              <v-btn text color="primary" @click="onClickOkDatepicker">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        <v-flex>
          <v-btn
            block
            color="primary"
            @click="onClickSubmit"
          >
            Submit
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn
            block
            link
            to="/"
          >
            Cancel
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ActionTypes, moduleName } from '@/stores/dDays'
import DDay from '@/types/interfaces/DDay'
import generateUUID from '@/utils/generateUUID'
import eventBus from '@/plugins/eventBus'
import EventBusEvent from '@/types/enums/EventBusEvent'
import { ShowFeedbackMessagePayload } from '@/types/interfaces/EventBusPayload'

const dDayStore = namespace(moduleName)

@Component
export default class AddDDay extends Vue {
  @dDayStore.Action(ActionTypes.AddDDay)
  addDDay: (dDay: DDay) => void

  title: string = ''
  date: string = ''

  isValid: boolean = false
  titleRules = [
    (value: string): boolean | string => !!value || 'Title is required',
    (value: string): boolean | string => (value && value.length > 2) || 'Title must be more than 2 characters'
  ]
  dateRules = [
    (value: string): boolean | string => !!value || 'Date is required'
  ]

  isShownDialog: boolean = false

  async onClickSubmit () {
    if (!(this.$refs.form as any).validate()) return

    const dDay: DDay = {
      id: generateUUID(),
      title: this.title,
      date: this.date
    }

    const feedbackMessagePayload: ShowFeedbackMessagePayload = {
      message: `Add ${dDay.title}`
    }

    this.addDDay(dDay)
    eventBus.$emit(EventBusEvent.ShowFeedbackMessage, feedbackMessagePayload)
    await this.$router.push('/')
  }

  onClickOkDatepicker () {
    (this.$refs.dialog as any).save(this.date)
  }

  onClickCloseDatepicker () {
    this.isShownDialog = false
  }
}
</script>

<style scoped>

</style>

<template>
  <v-container fluid grid-list-lg>
    <v-form ref="form" v-model="isValid">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="title"
            label="Title"
            required
            :rules="titleRules"
          />
        </v-col>
        <v-col cols="12">
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
        </v-col>
        <v-col cols="12">
          <v-btn
            block
            color="primary"
            @click="onClickSubmit"
          >
            Submit
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn
            block
            link
            to="/"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import { ActionTypes, moduleName } from '@/stores/dDays'
import DDay from '@/types/interfaces/DDay'
import generateUUID from '@/utils/generateUUID'
import eventBus from '@/plugins/eventBus'
import EventBusEvent from '@/types/enums/EventBusEvent'
import { ShowFeedbackMessagePayload } from '@/types/interfaces/EventBusPayload'
import { formatDate } from '@/utils/dateUtils'

const dDayStore: BindingHelpers = namespace(moduleName)

@Component
export default class AddDDay extends Vue {
  @dDayStore.Action(ActionTypes.AddDDay)
  addDDay: (dDay: DDay) => void

  title: string = ''
  date: string = formatDate(new Date())

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

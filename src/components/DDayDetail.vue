<template>
  <v-card>

  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import { GetterTypes, moduleName } from '@/stores/dDays'
import DDay from '@/types/interfaces/DDay'

const dDayStore: BindingHelpers = namespace(moduleName)

@Component
export default class DDayDetail extends Vue {
  @Prop({ type: String, required: true })
  id

  @dDayStore.Getter(GetterTypes.GetDDay)
  getDDay: (id: string) => DDay

  dDay: DDay = null

  mounted () {
    this.dDay = this.getDDay(this.id)
  }
}
</script>

<template>
  <d-day-list />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DDayList from '@/components/DDayList.vue'

@Component({
  components: {
    DDayList
  }
})
export default class Home extends Vue {

}
</script>

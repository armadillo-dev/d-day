<template>
  <d-day-detail
    :id="$route.params.id"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DDayDetail from '@/components/DDayDetail.vue'

@Component({
  components: {
    DDayDetail
  }
})
export default class Detail extends Vue {

}
</script>

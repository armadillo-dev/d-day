<template>
  <add-d-day />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddDDay from '@/components/AddDDay.vue'

@Component({
  components: {
    AddDDay
  }
})
export default class Add extends Vue {

}
</script>

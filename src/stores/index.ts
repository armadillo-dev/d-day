import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import RootState from '@/types/interfaces/RootState'
import { setting } from '@/stores/setting'
import { dDays } from '@/stores/dDays'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    setting,
    dDays
  }
}

export default new Vuex.Store<RootState>(store)

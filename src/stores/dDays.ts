import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import DDayState from '@/types/interfaces/DDayState'
import RootState from '@/types/interfaces/RootState'
import DDay from '@/types/interfaces/DDay'
import { getItem, setItem } from '@/utils/storage'
import { formatDate } from '@/utils/dateUtils'

export const moduleName = 'dDays'

export enum GetterTypes {
  GetDDays = 'GET_D_DAYS',
}

export enum ActionTypes {
  FetchDDays = 'FETCH_D_DAYS',
  AddDDay = 'ADD_D_DAY',
  ResetDDay = 'RESET_D_DAY',
  RemoveDDay = 'REMOVE_D_DAY',
}

export enum MutationTypes {
  SetDDays = 'SET_D_DAYS',
  AddDDay = 'ADD_D_DAY',
  SetDDay = 'SET_D_DAY',
  RemoveDDay = 'REMOVE_D_DAY',
}

export const initialState: DDayState = {
  dDays: []
}

export const getters: GetterTree<DDayState, RootState> = {
  [GetterTypes.GetDDays] (state): DDay[] {
    return state.dDays
  }
}

export const actions: ActionTree<DDayState, RootState> = {
  [ActionTypes.FetchDDays] ({ commit }) {
    const dDays = getItem('dDays') || []
    commit(MutationTypes.SetDDays, dDays)
  },

  [ActionTypes.AddDDay] ({ commit, state }, payload: DDay) {
    commit(MutationTypes.AddDDay, payload)
    setItem('dDays', state.dDays)
  },

  [ActionTypes.ResetDDay] ({ commit, state }, payload: DDay) {
    const dDay: DDay = {
      ...state.dDays.find(dDay => dDay.id === payload.id),
      date: formatDate(new Date())
    }

    commit(MutationTypes.SetDDay, dDay)
    setItem('dDays', state.dDays)
  },

  [ActionTypes.RemoveDDay] ({ commit, state }, payload: DDay) {
    const dDay = state.dDays.find(dDay => dDay.id === payload.id)

    commit(MutationTypes.RemoveDDay, dDay)
    setItem('dDays', state.dDays)
  }
}

export const mutations: MutationTree<DDayState> = {
  [MutationTypes.AddDDay] (state, payload: DDay) {
    state.dDays.push(payload)
  },

  [MutationTypes.SetDDay] (state, payload: DDay) {
    const index = state.dDays.findIndex(dDay => dDay.id === payload.id)
    state.dDays.splice(index, 1, payload)
  },

  [MutationTypes.SetDDays] (state, payload: DDay[]) {
    state.dDays = payload
  },

  [MutationTypes.RemoveDDay] (state, payload: DDay) {
    state.dDays = state.dDays.filter(dDay => dDay.id !== payload.id)
  }
}

const namespaced = true

export const dDays: Module<DDayState, RootState> = {
  namespaced,
  state: initialState,
  getters,
  actions,
  mutations
}

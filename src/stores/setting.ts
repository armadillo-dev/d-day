import {
  ActionTree, GetterTree, Module, MutationTree
} from 'vuex'
import Theme from '@/types/enums/Theme'
import RootState from '@/types/interfaces/RootState'
import SettingState from '@/types/interfaces/SettingState'
import { getItem, setItem } from '@/utils/storage'

export const moduleName = 'setting'

export enum GetterTypes {
  GetTheme = 'GET_THEME',
}

export enum ActionTypes {
  FetchTheme = 'FETCH_THEME',
  UpdateTheme = 'UPDATE_THEME',
}
export enum MutationTypes {
  SetTheme = 'SET_THEME',
}

export const initialState: SettingState = {
  theme: Theme.Dark
}

export const getters: GetterTree<SettingState, RootState> = {
  [GetterTypes.GetTheme] (state): Theme {
    return state.theme
  }
}

export const actions: ActionTree<SettingState, RootState> = {
  [ActionTypes.FetchTheme] ({ commit }): any {
    const theme = getItem('theme') || Theme.Dark
    commit(MutationTypes.SetTheme, theme)
  },

  [ActionTypes.UpdateTheme] ({ commit }, payload: Theme): any {
    setItem('theme', payload)
    commit(MutationTypes.SetTheme, payload)
  }
}

export const mutations: MutationTree<SettingState> = {
  [MutationTypes.SetTheme] (state, payload: Theme) {
    state.theme = payload
  }
}

const namespaced: boolean = true

export const setting: Module<SettingState, RootState> = {
  namespaced,
  state: initialState,
  getters,
  actions,
  mutations
}

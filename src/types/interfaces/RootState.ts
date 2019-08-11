import SettingState from '@/types/interfaces/SettingState'
import DDay from '@/types/interfaces/DDay'

interface RootState {
  setting: SettingState,
  dDays: DDay[],
}

export default RootState

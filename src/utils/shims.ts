import { MirrorItem, MirrorViewItem } from '@/types/MirrorItem'
import utils from './index'

const dateFormat = utils.dateFormat

const mirrorViewShim = (mirrorItem: MirrorItem): MirrorViewItem => {
  return { ...mirrorItem,
    lastUpdateTimeString: mirrorItem.lastUpdate !== undefined ? dateFormat(new Date(mirrorItem.lastUpdate)) : undefined,
    lastStartedTimeString: mirrorItem.lastStarted !== undefined ? dateFormat(new Date(mirrorItem.lastStarted)) : undefined,
    lastEndedTimeString: mirrorItem.lastEnded !== undefined ? dateFormat(new Date(mirrorItem.lastEnded)) : undefined,
    nextScheduleTimeString: mirrorItem.nextSchedule !== undefined ? dateFormat(new Date(mirrorItem.nextSchedule)) : undefined,
    lastOnlineTimeString: mirrorItem.lastOnline !== undefined ? dateFormat(new Date(mirrorItem.lastOnline)) : undefined,
    lastRegisterTimeString: mirrorItem.lastRegister !== undefined ? dateFormat(new Date(mirrorItem.lastRegister)) : undefined
  }
}

export {
  mirrorViewShim
}

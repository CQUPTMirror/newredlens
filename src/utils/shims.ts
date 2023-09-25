import { MirrorItem, MirrorViewItem } from '@/types/MirrorItem'
import utils from './index'

const dateFormat = utils.dateFormat

const dateFromMirrorItem = (d: number): Date => {
  return new Date(d * 1000)
}

const mirrorViewShim = (mirrorItem: MirrorItem): MirrorViewItem => {
  return { ...mirrorItem,
    lastUpdateTimeString: mirrorItem.lastUpdate !== undefined ? dateFormat(dateFromMirrorItem(mirrorItem.lastUpdate)) : undefined,
    lastStartedTimeString: mirrorItem.lastStarted !== undefined ? dateFormat(dateFromMirrorItem(mirrorItem.lastStarted)) : undefined,
    lastEndedTimeString: mirrorItem.lastEnded !== undefined ? dateFormat(dateFromMirrorItem(mirrorItem.lastEnded)) : undefined,
    nextScheduleTimeString: mirrorItem.nextSchedule !== undefined ? dateFormat(dateFromMirrorItem(mirrorItem.nextSchedule)) : undefined,
    lastOnlineTimeString: mirrorItem.lastOnline !== undefined ? dateFormat(dateFromMirrorItem(mirrorItem.lastOnline)) : undefined,
    lastRegisterTimeString: mirrorItem.lastRegister !== undefined ? dateFormat(dateFromMirrorItem(mirrorItem.lastRegister)) : undefined
  }
}

export {
  mirrorViewShim
}

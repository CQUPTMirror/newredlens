import { MirrorItem, MirrorViewItem } from '@/types/MirrorItem'
import utils from './index'

const dateFormat = utils.dateFormat

const dateStringFromMirrorItem = (d?: number): string | undefined => {
  return d && d > 0 ? dateFormat(new Date(d * 1000)) : undefined
}

const mirrorViewShim = (mirrorItem: MirrorItem): MirrorViewItem => {
  return { ...mirrorItem,
    lastUpdateTimeString: dateStringFromMirrorItem(mirrorItem.lastUpdate),
    lastStartedTimeString: dateStringFromMirrorItem(mirrorItem.lastStarted),
    lastEndedTimeString: dateStringFromMirrorItem(mirrorItem.lastEnded),
    nextScheduleTimeString: dateStringFromMirrorItem(mirrorItem.nextSchedule),
    lastOnlineTimeString: dateStringFromMirrorItem(mirrorItem.lastOnline),
    lastRegisterTimeString: dateStringFromMirrorItem(mirrorItem.lastRegister)
  }
}

export {
  mirrorViewShim
}

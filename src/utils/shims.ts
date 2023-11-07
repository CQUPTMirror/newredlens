import { MirrorItem, MirrorViewItem } from '@/types/MirrorItem'
import utils from './index'

const dateFormat = utils.dateFormat

const dateStringFromMirrorItem = (d?: number): string | undefined => {
  return d && d > 0 ? dateFormat(new Date(d * 1000)) : undefined
}

const convertSizeString = (bytes: number) => {
  const exp = Math.floor(Math.log(bytes) / Math.log(1024))
  const result = (bytes / Math.pow(1024, exp)).toFixed(2)
  return result + ' ' + (exp === 0 ? 'B' : 'KMGTPEZY'[exp - 1] + 'B')
}

const mirrorViewShim = (mirrorItem: MirrorItem): MirrorViewItem => {
  return { ...mirrorItem,
    lastUpdateTimeString: dateStringFromMirrorItem(mirrorItem.lastUpdate),
    lastStartedTimeString: dateStringFromMirrorItem(mirrorItem.lastStarted),
    lastEndedTimeString: dateStringFromMirrorItem(mirrorItem.lastEnded),
    nextScheduleTimeString: dateStringFromMirrorItem(mirrorItem.nextSchedule),
    lastOnlineTimeString: dateStringFromMirrorItem(mirrorItem.lastOnline),
    lastRegisterTimeString: dateStringFromMirrorItem(mirrorItem.lastRegister),
    sizeString: mirrorItem.sizeStr || convertSizeString(mirrorItem.size ?? 0)
  }
}

export {
  mirrorViewShim
}

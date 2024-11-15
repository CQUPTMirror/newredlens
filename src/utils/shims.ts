import type { MirrorItem, MirrorViewItem } from '@/types/MirrorItem'

function formatDate(timestamp: number): string {
  if (!timestamp)
    return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export function mirrorViewShim(item: MirrorItem): MirrorViewItem {
  return {
    ...item,
    lastUpdateTimeString: item.lastUpdate ? formatDate(item.lastUpdate) : '',
    sizeString: item.sizeStr,
  }
}

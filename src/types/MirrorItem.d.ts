/* eslint-disable camelcase */
export type MirrorItem = {
    id: string,
    alias: string,
    status: 'none' | 'failed' | 'success' | 'syncing' | 'pre-syncing' | 'paused' | 'disabled' | 'cached',
    desc?: string,
    lastUpdate?: number,
    lastStarted?: number,
    lastEnded?: number,
    nextSchedule?: number,
    upstream?: string,
    size?: number,
    sizeStr?: string,
    url?: string,
    type: 'mirror' | 'proxy' | 'git',
    errorMsg?: string,
    lastOnline?: number,
    lastRegister?: number
}

export type MirrorViewItem = MirrorItem & {
    lastUpdateTimeString?: string,
    lastStartedTimeString?: string,
    lastEndedTimeString?: string,
    nextScheduleTimeString?: string,
    lastOnlineTimeString?: string,
    lastRegisterTimeString?: string,
    sizeString?: string
}

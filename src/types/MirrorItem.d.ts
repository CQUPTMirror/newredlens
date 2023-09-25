/* eslint-disable camelcase */
export type MirrorItem = {
    id: string,
    alias: string,
    status?: string,
    lastUpdate?: number,
    lastStarted?: number,
    lastEnded?: number,
    nextSchedule?: number,
    upstream?: string,
    size?: string,
    url?: string,
    type: 'mirror' | 'proxy',
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
    lastRegisterTimeString?: string
}

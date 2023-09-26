export type SingleFile = {
  name: string,
  path: string
}

export type FileItem = {
  id: string,
  alias: string,
  type: 'os' | 'app',
  files: SingleFile[],
  updateTime: number
}

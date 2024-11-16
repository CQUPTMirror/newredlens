import type { SelectOption } from 'naive-ui'

export interface IsoFile {
  name: string
  ext: string
  majorVersion: string
  version: string
  arch: string
  edition: string
  editionType: string
  part: number
  path: string
  size: number
  sizeStr: string
}

export interface IsoDistro {
  id: string
  type: string
  alias: string
  files: IsoFile[]
  updateTime: number
}

export interface IsoSelectOption extends SelectOption {
  file?: IsoFile
  type: 'distro' | 'version' | 'arch' | 'edition'
}

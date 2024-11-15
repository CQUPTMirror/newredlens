// import { createApiClient } from './core/apiClient'

// export interface IsoFile {
//   name: string
//   path: string
// }

// export interface IsoItem {
//   id: string
//   alias?: string
//   files: IsoFile[]
// }

// export interface IsoCategory {
//   [key: string]: IsoItem
// }

// export interface IsoData {
//   [category: string]: IsoCategory
// }

// const apiClient = createApiClient('')

// export async function getIsoInfo(): Promise<IsoInfo> {
//   try {
//     const data = await apiClient.get<IsoInfo>('/api/iso')
//     return data
//   }
//   catch (error) {
//     console.error('获取ISO数据失败:', error)
//     if (error instanceof Error) {
//       throw new TypeError(`获取ISO数据失败: ${error.message}`)
//     }
//     throw new Error('获取ISO数据失败')
//   }
// }

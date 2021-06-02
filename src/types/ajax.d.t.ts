declare namespace Ajax {

  interface Error {
    code: number,
    msg: string,
    domain: string
  }

  // axios 返回数据
  interface AxiosResponse<T> {
    data: T,
    error: Error
  }

  // 分页接口数据
  interface PageResult<T> {
    total: number,
    data: T[],
    offset: number,
    limit: number,

    error?: Error
  }

  // 类型别名
  export type PromiseAxiosResponse<T> = Promise<AxiosResponse<T>>
  export type PromisePageResult<T> = Promise<PageResult<T>>
}

export interface Response<T> {
  code: number
  data: T
  msg: string
}

export interface ListModel<T> {
  list: T[]
  total: number
}

export interface ResponseList<T> extends Response<ListModel<T>> {
}


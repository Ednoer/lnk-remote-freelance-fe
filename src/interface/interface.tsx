export interface Response<T> {
  code?: number
  message?: string | string[]
  data?: T
}

export interface ResponseError {
  code: number
  message: string
  data: object
}
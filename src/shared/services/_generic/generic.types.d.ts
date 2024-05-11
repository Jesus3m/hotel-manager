export type Result<T> = {
  success: boolean
  data: T
  code: number
}

export type ResultWithPagination<T> = Result<T> & {
  total: number
  page: number
  page_size: number
  search?: string
}

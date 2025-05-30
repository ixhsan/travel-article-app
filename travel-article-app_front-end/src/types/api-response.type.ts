export interface BaseResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginatedData<T> {
  data: T;
  current_page: number;
  total_page: number;
  page_size: number;
  total: number | null;
}

export type ApiRequest<Payload = undefined, Params = undefined> = [
  Payload
] extends [undefined]
  ? [Params] extends [undefined]
    ? never
    : { params: Params }
  : [Params] extends [undefined]
  ? { data: Payload }
  : { data: Payload; params: Params };

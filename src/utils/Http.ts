import axios, {
  Method,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'

const baseUrl = '/api/v3'

export interface IApi {
  api: string
  method?: string
}

export interface IResponse<T> {
  header: {
    code: number
    msg: 'Success' | 'Failed'
    token: string
  }
  payload: T
}

export interface IHttpOptions extends AxiosRequestConfig {
  //需要手动处理错误
  isManualHandleError?: boolean
}

/**
 *
 * @param api
 * @param data
 */
function request<T>(
  api: string | IApi,
  data?: unknown,
  requestOptions?: IHttpOptions
): Promise<T> {
  const url = typeof api === 'string' ? api : api.api
  //   const headers = {
  //     ...requestOptions?.headers,
  //     Authorization: `Bearer ${token}`
  //   }

  //   return new Promise<T>((resolve, reject) => {
  //     axios({
  //       ...requestOptions,
  //       headers,
  //       url,
  //       method,
  //       params
  //     })
  //       .then((res: AxiosResponse<IResponse<T>>) => {
  //         resolve(res)
  //       })
  //       .catch((error) => {})
  //   })
}

function setToken(token): void {}

export const http = {
  get: request
}

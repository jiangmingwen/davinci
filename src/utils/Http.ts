import { DEFAULT_JWT_TOKEN_EXPIRED } from '@/constants'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { notification } from 'antd'
import { local } from './Storage'

const baseUrl = '/api/v3'

let tokenExpired = DEFAULT_JWT_TOKEN_EXPIRED

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
  //是否关闭自动的错误提示
  disabledAutoNotifyError?: boolean
}

export function request<T>(url: string, options?: IHttpOptions): Promise<T>
export function request<T = any>(config: IHttpOptions): Promise<T>
export function request<T = any>(
  url: string | IHttpOptions,
  options?: IHttpOptions
): Promise<T> {
  const token = local.getItem('TOKEN')
  const axiosPromise =
    typeof url === 'string'
      ? axios(baseUrl + url, {
          ...options,
          headers: {
            ...options?.headers,
            Authorization: token ? `Bearer ${token}` : undefined
          }
        })
      : axios({
          ...url,
          url: baseUrl + url.url,
          headers: {
            ...url.headers,
            Authorization: token ? `Bearer ${token}` : undefined
          }
        })
  return new Promise((resolve, reject) => {
    axiosPromise
      .then(parseData)
      .then(refreshToken)
      .then((res: IResponse<T>) => {
        if (res.header) {
          if (res.header.code === 200 && res.header.msg === 'Success') {
            resolve(res.payload)
          } else {
            reject(res.payload)
            const closeNotify =
              typeof url === 'string'
                ? options?.disabledAutoNotifyError
                : url.disabledAutoNotifyError
            if (!closeNotify)
              notification.error({
                message: res.header.code,
                description: res.header.msg
              })
          }
        } else {
          resolve(res.payload)
        }
      })
      .catch((error: AxiosError) => {
        reject(error.response?.data?.payload)
        notification.error({
          message: error.response?.data?.header?.code || '请求错误',
          description: error.response?.data?.header?.msg || '未知错误'
        })
      })
  })
}

function parseData<T = any>(
  response: AxiosResponse<IResponse<T>>
): IResponse<T> {
  return response.data
}

/**
 * 刷新token
 * @param response 返回的数据
 */
function refreshToken<T>(response: IResponse<T>): IResponse<T> {
  const token = response.header && response.header.token
  if (token) {
    setToken(token)
  }
  return response
}

function setToken(token: string): void {
  local.setItem('TOKEN', token, tokenExpired)
}

/**
 * get请求
 * @param api api地址
 * @param params 传入参数
 * @param options http配置
 */
export function getMethod<T>(
  api: string,
  params?: any,
  options?: IHttpOptions
): Promise<T> {
  return request(api, { ...options, params, method: 'GET' })
}

/**
 * post请求
 * @param api api地址
 * @param params 传入参数
 * @param options http配置
 */
export function postMethod<T>(
  api: string,
  data?: any,
  options?: IHttpOptions
): Promise<T> {
  return request(api, { ...options, data, method: 'POST' })
}

/**
 * put请求
 * @param api api地址
 * @param data 传入参数
 * @param options http配置
 */
export function putMethod<T>(
  api: string,
  data?: any,
  options?: IHttpOptions
): Promise<T> {
  return request(api, { ...options, data, method: 'PUT' })
}

/**
 * delete请求
 * @param api api地址
 * @param params 传入参数
 * @param options http配置
 */
export function deleteMethod<T>(
  api: string,
  params?: any,
  options?: IHttpOptions
): Promise<T> {
  return request(api, { ...options, params, method: 'DELETE' })
}

/**
 * head请求
 * @param api api地址
 * @param params 传入参数
 * @param options http配置
 */
export function headMethod<T>(
  api: string,
  data?: any,
  options?: IHttpOptions
): Promise<T> {
  return request(api, { ...options, data, method: 'HEAD' })
}

/**
 * patch请求
 * @param api api地址
 * @param params 传入参数
 * @param options http配置
 */
export function patchMethod<T>(
  api: string,
  data?: any,
  options?: IHttpOptions
): Promise<T> {
  return request(api, { ...options, data, method: 'PATCH' })
}

/**
 * 设置token的过期时间
 * @param expire 过期时间
 */
export function setTokenExpired(expire: number): void {
  tokenExpired = Number(expire)
}

const http = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
  head: headMethod,
  patch: patchMethod
}

export default http

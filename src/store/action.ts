import http from '@/utils/Http'
import { GET_GLOABLE_CONFIG } from './types'

export const getConfig = () => (dispatch: any) => {
  http.get('/configurations').then((res) => {
    dispatch({
      type: GET_GLOABLE_CONFIG,
      payload: res
    })
  })
}

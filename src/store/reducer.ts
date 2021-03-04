import { setTokenExpired } from '@/utils/Http'
import { GET_GLOABLE_CONFIG } from './types'

function reducer(
  state = { version: '' },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case GET_GLOABLE_CONFIG:
      setTokenExpired(action.payload.jwtToken.timeout)
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default reducer

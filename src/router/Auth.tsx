import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { IRoutesConfig } from './config'

export interface IpropsModel {
  config: IRoutesConfig[]
  [key: string]: any
}

//权限列表
const permissions: string[] = []

/**
 * 判断是否有权限
 * @param authCode 权限编码
 */
export const hasPermission = (authCode: string): boolean => {
  return true || permissions.includes(authCode)
}

export default class RouterAuth extends Component<any, IpropsModel> {
  render() {
    const { location, config } = this.props
    const { pathname } = location

    //如果是白名单，直接跳过
    const targetRouterConfig: IRoutesConfig = config.find(
      (v: IRoutesConfig) => v.path === pathname
    )

    if (targetRouterConfig) {
      if (targetRouterConfig.white) {
        const { component } = targetRouterConfig
        return <Route exact path={pathname} component={component} />
      }

      //如果不是白名单
      //是否登录
      //判断是否有该页面的权限
      if (hasPermission(targetRouterConfig.authCode || '')) {
        return (
          <Route path={pathname} component={targetRouterConfig.component} />
        )
      } else {
        return <Redirect to="/404" />
      }
    } else {
      return <Redirect to="/404" />
    }
  }
}

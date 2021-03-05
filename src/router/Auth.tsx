import { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

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
  constructor(props: IpropsModel) {
    super(props)
    this.transformRouteConfigToFlat(this.props.config)
  }
  private flatRoutePatchMapData: { [key: string]: any } = {}

  private renderChilren(route: IRoutesConfig) {
    return (
      <>
        {route.redirect && <Redirect to={route.redirect} />}
        <route.component>
          <Switch>
            {route?.children?.map((routeItem) => {
              if (route?.children?.length) {
                return this.renderChilren(routeItem)
              } else {
                return (
                  <Route
                    key={routeItem.path}
                    path={routeItem.path}
                    component={routeItem.component}
                  />
                )
              }
            })}
          </Switch>
        </route.component>
      </>
    )
  }

  private transformRouteConfigToFlat(
    list: IRoutesConfig[],
    parentPath?: string
  ) {
    list.forEach((item) => {
      const path =
        parentPath && !item.path.startsWith('/')
          ? parentPath + '/' + item.path
          : item.path
      this.flatRoutePatchMapData[path] = item
      if (item.children) {
        this.transformRouteConfigToFlat(item.children || [], path)
      }
    })
  }

  render() {
    //路由守卫功能
    const { location } = this.props
    const { pathname } = location
    const targetRouterConfig: IRoutesConfig = this.flatRoutePatchMapData[
      pathname
    ]
    console.log(targetRouterConfig, location)

    console.log(this.flatRoutePatchMapData, 'flatRoutePatchMapData')
    if (targetRouterConfig) {
      return (
        <Route
          path={pathname}
          render={() => this.renderChilren(targetRouterConfig)}
        />
      )
    } else {
      return <Redirect to="/404" />
    }
  }
}

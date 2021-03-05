import { Route, Switch, Redirect } from 'react-router-dom'
import { IRoutesConfig } from './config'

export interface IRouteRenderProps {
  routes: IRoutesConfig[]
  [key: string]: any
}

export default function RouteRender(props: IRouteRenderProps) {
  const renderChilren = (routes: IRoutesConfig[]) => {
    return (
      <>
        {routes.map((route) => {
          if (route?.children?.length) {
            return (
              <Route
                key={route.path}
                path={route.path}
                component={() => (
                  <route.component>
                    <Switch>{renderChilren(route?.children || [])}</Switch>
                    {route.redirect ? (
                      <Redirect to={route.redirect || ''} />
                    ) : null}
                  </route.component>
                )}
              />
            )
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact
                component={route.component}
              />
            )
          }
        })}
      </>
    )
  }

  return (
    <>
      <Switch>{renderChilren(props.routes)}</Switch>
    </>
  )
}

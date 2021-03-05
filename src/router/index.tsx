import { HashRouter as Router } from 'react-router-dom'
import routesConfig from './config'
import RouteRender from './RouteRender'
export default function AppRoute() {
  return (
    <Router>
      <RouteRender routes={routesConfig} />
    </Router>
  )
}

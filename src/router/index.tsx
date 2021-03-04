import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RouterAuth from './Auth'
import routesConfig from './config'

export default function AppRoute() {
  return (
    <Router>
      <Switch>
        <RouterAuth config={routesConfig} />
      </Switch>
    </Router>
  )
}

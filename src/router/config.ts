import Login from '@pages/login'
import Projects from '@pages/projects'
import Account from '@pages/account'

export interface IRoutesConfig {
  path: string
  component: any
  white?: boolean
  authCode?: string
}

const routesConfig: IRoutesConfig[] = [
  {
    path: '/',
    component: Login,
    white: true
  },
  {
    path: '/projects',
    component: Projects,
    white: false
  },
  {
    path: '/account',
    component: Account,
    white: false
  }
]

export default routesConfig

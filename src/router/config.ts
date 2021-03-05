import Login from '@pages/login'
import Register from '@pages/register'
import Projects from '@pages/projects'
import Account from '@pages/account'
import { ComponentClass, FunctionComponent } from 'react'
import Main from '@/pages/Main'

export interface IRoutesConfig {
  path: string
  component: FunctionComponent | ComponentClass
  white?: boolean
  authCode?: string
  children?: IRoutesConfig[]
  redirect?: string
}

const routesConfig: IRoutesConfig[] = [
  {
    path: '/',
    component: Login,
    white: true
  },
  {
    path: '/register',
    component: Register,
    white: true
  },
  {
    path: '/main',
    component: Main,
    white: false,
    redirect: '/main/projects',
    children: [
      {
        path: '/main/projects',
        component: Projects
      }
    ]
  },
  {
    path: '/account',
    component: Account,
    white: false,
    redirect: '/account/profile',
    children: [
      {
        path: '/account/profile',
        component: Projects
      }
    ]
  }
]

export default routesConfig

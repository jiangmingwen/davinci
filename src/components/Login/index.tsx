import { connect } from 'react-redux'
import { ReactNode } from 'react'
import Background from './Background'
import './style.less'
import Logo from '@imgs/logo_light.svg'
import React from 'react'

interface ILoginProps {
  version?: string
  children: ReactNode
}

function Login(props: ILoginProps) {
  return (
    <div className="login-page">
      <Background />
      <div className="login-form">
        <img src={Logo} alt="logo" />
        {React.Children.only(props.children)}
      </div>
      <div className="version-box">版本：{props.version}</div>
    </div>
  )
}

export default connect((state: any) => ({
  version: state.global.version
}))(Login)

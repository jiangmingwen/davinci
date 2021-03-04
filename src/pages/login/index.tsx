import LoginForm from './LoginForm'
import LoginBackground from './LoginBackground'
import './style.less'
import { connect } from 'react-redux'

interface ILoginProps {
  version: string
}

function Login(props: ILoginProps) {
  return (
    <div className="login-page">
      <LoginBackground />
      <LoginForm />
      <div className="version-box">版本：{props.version}</div>
    </div>
  )
}

export default connect((state: any) => ({
  version: state.global.version
}))(Login)

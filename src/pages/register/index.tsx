import LoginTemplate from '@/components/Login'
import { useState } from 'react'
import RegisterForm from './RegisterForm'
import Result from './Result'

export default function Register() {
  const [resultView, setResultView] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <LoginTemplate>
      {!resultView ? (
        <RegisterForm setResultView={setResultView} setEmail={setEmail} />
      ) : (
        <Result email={email} setResultView={setResultView} />
      )}
    </LoginTemplate>
  )
}

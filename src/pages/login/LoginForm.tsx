import Logo from '@imgs/logo_light.svg'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import http from '@/utils/Http'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    setLoading(true)
    http
      .post('/login', values)
      .then((res) => {
        setLoading(false)
        history.push('/projects')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="login-form">
      <img src={Logo} alt="logo" />
      <Form
        name="normal_login"
        className="form-container"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="username">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用 户 名"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密 码"
          />
        </Form.Item>

        <Form.Item className="last-row">
          <Button
            htmlType="submit"
            loading={loading}
            className="login-form-button"
            ghost
            block
          >
            登 录
          </Button>
          <div className="action-box">
            <Button type="link">注册新账户</Button>
            <Button type="link">忘记密码?</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

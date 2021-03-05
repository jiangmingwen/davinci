import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import http from '@/utils/Http'
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './style.less'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const history = useHistory()

  const onFinish = (values: any) => {
    setLoading(true)
    http
      .post('/login', values)
      .then((res) => {
        setLoading(false)
        history.push('/main/projects')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onValuesChange = (value: unknown, values: Record<string, string>) => {
    setValid(Object.keys(values).every((key) => values[key]))
  }

  return (
    <Form
      name="normal_login"
      className="form-container"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
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
          disabled={!valid}
        >
          登 录
        </Button>
        <div className="action-box">
          <Link to="/register">注册新账户 </Link>
          <Button type="link">忘记密码?</Button>
        </div>
      </Form.Item>
    </Form>
  )
}

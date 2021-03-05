import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import http from '@/utils/Http'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.less'
import { local } from '@/utils/Storage'
import { connect } from 'react-redux'

interface IRegisterFormProps {
  setResultView: (view: boolean) => any
  setEmail: (email: string) => any
  timeout?: any
}

function RegisterForm(props: IRegisterFormProps) {
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    console.log(values)
    http
      .post('/users', values)
      .then((res) => {
        setLoading(false)
        //注册成功换视图为注册结果
        props.setResultView(true)
        props.setEmail(values.email)
        local.setItem('TOKEN', res, Number(props.timeout || 0))
      })
      .catch(() => {
        setLoading(false)
      })
  }
  return (
    <Form
      name="normal_login"
      className="form-container"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '此字段必填' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '此字段必填' },
          {
            type: 'email',
            message: '请输入正确的邮箱格式'
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="邮箱"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '此字段必填' },
          { type: 'string', min: 6, max: 20, message: '密码长度6-20位' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: '此字段必填' },
          { type: 'string', min: 6, max: 20, message: '密码长度6-20位' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次输入的密码不匹配!'))
            }
          })
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="确认密码"
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
          注册
        </Button>
        <div className="action-box_go">
          已有davinci账号，<Link to="/">点击登录</Link>
        </div>
      </Form.Item>
    </Form>
  )
}

export default connect((state: any) => ({
  timeout: state.global?.jwtToken?.timeout
}))(RegisterForm)

import http from '@/utils/Http'
import { Button } from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons'

export interface IResultProps {
  email: string
  setResultView: (view: boolean) => any
}

export default function Result(props: IResultProps) {
  const { email } = props
  const sendEmail = () => {
    http.post('/users/sendmail', { email }).then((res) => {
      console.log(res, '发送结果吗')
    })
  }

  const goEmailNet = () => {
    let suffixNet = ''
    if (email) {
      suffixNet = email.split('@')[1]
      const net =
        email.indexOf('creditease') > 0
          ? `https://email.${suffixNet}`
          : `https://mail.${suffixNet}`
      window.open(net)
    }
  }

  return (
    <div className="register-result">
      <h1>请查收电子邮件</h1>
      <p>
        我们向 <b>{email}</b> 发送了一封电子邮件，请
        <b>
          <Button type="link" onClick={goEmailNet}>
            前往
          </Button>
        </b>
        电子邮件中确认。
      </p>
      <p>
        没收到？{' '}
        <Button type="link" onClick={sendEmail}>
          重新发送电子邮件
        </Button>
      </p>
      <div className="back-btn" onClick={() => props.setResultView(false)}>
        <LeftCircleOutlined />
        <span> 返回上一步 </span>
      </div>
    </div>
  )
}

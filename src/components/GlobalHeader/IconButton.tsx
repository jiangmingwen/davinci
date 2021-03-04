import {
  GithubOutlined,
  CloudDownloadOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Popover, Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function ICconButton() {
  return (
    <div>
      <DownloadButton />
      <GithubButton />
      <ProfileButton />
    </div>
  )
}

function DownloadButton() {
  const [visible, setVisible] = useState(false)
  const onVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }
  return (
    <Popover
      title="下载中心"
      trigger="click"
      visible={visible}
      placement="bottomRight"
      onVisibleChange={onVisibleChange}
    >
      <CloudDownloadOutlined className="icon-btn" />
    </Popover>
  )
}

function GithubButton() {
  const goGithub = () => window.open('https://github.com/jiangmingwen/davinci')
  return (
    <>
      <GithubOutlined
        onClick={goGithub}
        className="icon-btn"
        title="Jay's Davinci"
      />
    </>
  )
}

function ProfileButton() {
  const history = useHistory()
  const onGoSetting = () => {
    history.push('/account')
  }
  const onLogout = () => {
    console.log('退出登录')
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={onGoSetting}>
        <SettingOutlined />
        <span>用户设置</span>
      </Menu.Item>
      <Menu.Item onClick={onLogout}>
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
      <UserOutlined className="icon-btn" />
    </Dropdown>
  )
}

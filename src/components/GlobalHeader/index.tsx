import Logo from '@/assets/imgs/logo.svg'
import './style.less'
import ICconButton from './IconButton'

export default function GlobalHeader() {
  return (
    <div className="app-header">
      <img className="logo" src={Logo} alt="" />
      <ICconButton />
    </div>
  )
}

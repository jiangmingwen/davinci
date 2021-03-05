import GlobalHeader from '@/components/GlobalHeader'
import { ReactNode } from 'react'

export interface IMainProps {
  children?: ReactNode
}

export default function Main(props: IMainProps) {
  return (
    <div className="main-layout">
      <GlobalHeader />
      <div className="main-content">{props.children}</div>
    </div>
  )
}

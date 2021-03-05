import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import List, { IList } from './List'
import './style.less'
import http from '@/utils/Http'

export default function Projects(props?: any) {
  console.log(props)

  const [list, setList] = useState<IList[]>([])

  useEffect(() => {
    http.get<IList[]>('/projects').then((res) => {
      setList(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onNew = () => {
    console.log('new')
  }

  const onTabClick = (s: string) => {
    console.log(s, 'new')
  }

  const onSearch = () => {
    console.log('new')
  }

  return (
    <div>
      <Toolbar onNew={onNew} onSearch={onSearch} onTabClick={onTabClick} />
      <List list={list} />
    </div>
  )
}

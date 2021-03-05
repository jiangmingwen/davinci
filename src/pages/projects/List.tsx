import { Empty } from 'antd'
import ListItem from './ListItem'
export interface IListProps {
  list: IList[]
}

export interface IList {
  createBy: ICreateBy
  description: string
  id: number
  initialOrgId: number
  isStar: boolean
  isTransfer: boolean
  name: string
  orgId: number
  permission: IPermission
  pic: string
  starNum: number
  userId: number
  visibility: boolean
}

export interface IPermission {
  downloadPermission: boolean
  schedulePermission: number
  sharePermission: boolean
  sourcePermission: number
  viewPermission: number
  vizPermission: number
  widgetPermission: number
}

export interface ICreateBy {
  avatar: string
  email: string
  id: number
  username: string
}

export default function List(props: IListProps) {
  const { list } = props
  return (
    <div className="project-list">
      {props.list.length ? (
        list.map((item) => <ListItem key={item.id} data={item} />)
      ) : (
        <Empty description="无项目" />
      )}
    </div>
  )
}

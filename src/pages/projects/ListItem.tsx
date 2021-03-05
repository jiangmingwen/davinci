import { SwapOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Rate, Divider } from 'antd'
import { IList } from './List'

export interface IListItemProps {
  data: IList
}

export default function ListItem(props: IListItemProps) {
  const { data } = props
  return (
    <div className="project-item">
      <div
        className="project-item-content"
        style={{
          backgroundImage: `url(${require(`@imgs/bg${data.pic}.png`)})`
        }}
      >
        <div className="project-item-title">{data.name}</div>
        <div className="project-item-title">{data.description}</div>
      </div>
      <div className="project-item-bottom-btn">
        <span>
          <SwapOutlined />
          <DeleteOutlined />
          <EditOutlined />
        </span>
        <div className="star-box">
          <Rate count={1} value={data.isStar ? 1 : 0} />
          {data.isStar ? 'unstar' : 'star'}
          <Divider type="vertical" />
          {data.starNum}
        </div>
      </div>
    </div>
  )
}

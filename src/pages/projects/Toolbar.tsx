import { Tabs, Input, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { TabPane } = Tabs

export interface IToolbarProps {
  onNew: () => any
  onTabClick: (tab: string) => any
  onSearch: (searchText: string) => any
}

interface Itabs {
  tab: string
  key: string
}

const tabs: Itabs[] = [
  {
    tab: '全部',
    key: 'all'
  },
  {
    tab: '我参与的',
    key: 'canyu'
  },
  {
    tab: '我创建的',
    key: 'create'
  },
  {
    tab: '我收藏的',
    key: 'sc'
  },
  {
    tab: '最近浏览的',
    key: 'history'
  }
]

export default function Toolbar(props: IToolbarProps) {
  return (
    <div className="project-toolbar">
      <Tabs defaultActiveKey="all" onChange={props.onTabClick}>
        {tabs.map((item) => (
          <TabPane tab={item.tab} key={item.key}></TabPane>
        ))}
      </Tabs>
      <Input.Search
        placeholder="查找你的项目"
        onSearch={props.onSearch}
        style={{ width: 300 }}
      />
      <Button type="primary" shape="round" icon={<PlusOutlined />}>
        创建
      </Button>
    </div>
  )
}

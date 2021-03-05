import * as React from 'react'

export default function Account(props?: any) {
  console.log(props)
  return (
    <div>
      <div className="nav-left">左边</div>
      <div className="content-right">{props.children}</div>
    </div>
  )
}

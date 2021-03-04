import { useEffect } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getConfig } from './store/action'
import AppRouter from './router'

interface IAppProps {
  getGloabalConfig: () => void
}

function App(props: IAppProps) {
  useEffect(() => {
    props.getGloabalConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AppRouter />
}

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators({ getGloabalConfig: getConfig }, dispatch)
)(App)

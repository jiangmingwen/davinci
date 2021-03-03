import './App.css'
function run(num: number): void
function run(num: boolean): void
function run(num: boolean, str: string): void
function run(str: string, flag: boolean): void
function run(str: string, flag?: boolean): void
function run(str: number | string | boolean, flag?: boolean | string): void {
  console.log(str, flag)
  // 感觉这里还是要写if判断才能做逻辑
}
run('1', true)
run(true, '1')

function App() {
  return <div className="App"></div>
}

export default App

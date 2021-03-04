class Local {
  private expire = 7 * 24 * 60 * 60 * 1000 //7天
  private suffix = 'jay-' //前缀

  constructor(expire = 7 * 24 * 60 * 60 * 1000, suffix = 'jay-') {
    this.expire = expire
    this.suffix = suffix
  }

  public setItem(key: string, data: unknown, expire?: number): void {
    window.localStorage.setItem(
      this.suffix + key,
      JSON.stringify({
        value: data,
        expire:
          !expire || expire <= 0
            ? Date.now() + this.expire
            : Date.now() + expire
      })
    )
  }

  public getItem(key: string): unknown {
    const localData = JSON.parse(
      window.localStorage.getItem(this.suffix + key) || '{}'
    )
    //判断过期与否
    if (Date.now() < localData.expire) {
      //有效
      return localData.value
    } else {
      //已经过期
      this.removeItem(this.suffix + key)
      return
    }
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(this.suffix + key)
  }

  clear(): void {
    window.localStorage.clear()
  }
}
class Session {
  private expire = 7 * 24 * 60 * 60 * 1000 //7天
  private suffix = 'jay-' //前缀

  constructor(expire = 7 * 24 * 60 * 60 * 1000, suffix = 'jay-') {
    this.expire = expire
    this.suffix = suffix
  }

  public setItem(key: string, data: unknown, expire?: number): void {
    window.sessionStorage.setItem(
      this.suffix + key,
      JSON.stringify({
        value: data,
        expire:
          !expire || expire <= 0
            ? Date.now() + this.expire
            : Date.now() + expire
      })
    )
  }
  public getItem(key: string): unknown {
    const localData = JSON.parse(
      window.sessionStorage.getItem(this.suffix + key) || '{}'
    )
    //判断过期与否
    if (Date.now() < localData.expire) {
      //有效
      return localData.value
    } else {
      //已经过期
      this.removeItem(this.suffix + key)
      return
    }
  }

  removeItem(key: string): void {
    window.sessionStorage.removeItem(this.suffix + key)
  }

  clear(): void {
    window.sessionStorage.clear()
  }
}

export const local = new Local()
export const session = new Session()

const storage = {
  local,
  session
}

export default storage

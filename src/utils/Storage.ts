class Local {}
class Session {}

export const local = new Local()
export const session = new Session()

const storage = {
  local,
  session
}

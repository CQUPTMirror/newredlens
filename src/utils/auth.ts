// 重定向到登录页面
export const redirectLogin = () => {
  let uri = `/#/login`
  window.location.href = uri
}

export const refreshTokenException = (code) => {
  let flag = false
  const codes = [10000, 10042, 10050, 10052]
  if (codes.includes(code)) {
    flag = true
  }
  return flag
}

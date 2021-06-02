// 字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
const line2camel = (s: string) => {
  return s.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

// 字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
const camel2line = (s: string) => {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// JSON对象的key值转换为驼峰式
const jsonLine2Camel = (obj) => {
  if (obj instanceof Array) {
    obj.forEach(function (v, i) {
      jsonLine2Camel(v)
    })
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function (key) {
      const newKey = line2camel(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      jsonLine2Camel(obj[newKey])
    })
  }
}

// JSON对象的key值转换为下划线格式
const jsonCamel2Line = (obj) => {
  if (obj instanceof Array) {
    obj.forEach(function (v, i) {
      jsonCamel2Line(v)
    })
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function (key) {
      const newKey = camel2line(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      jsonCamel2Line(obj[newKey])
    })
  }
}

export {
  line2camel,
  camel2line,
  jsonCamel2Line,
  jsonLine2Camel
}

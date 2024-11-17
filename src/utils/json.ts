// 字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
function line2camel(s: string): string {
  return s.replace(/_(\w)/g, (_, letter) => {
    return letter.toUpperCase()
  })
}

// 字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
function camel2line(s: string): string {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

type JsonValue = string | number | boolean | null | JsonObject | JsonArray
interface JsonObject {
  [key: string]: JsonValue
}
type JsonArray = JsonValue[]

// JSON对象的key值转换为驼峰式
function jsonLine2Camel(obj: JsonValue): void {
  if (Array.isArray(obj)) {
    obj.forEach((v) => {
      jsonLine2Camel(v)
    })
  }
  else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    Object.keys(obj).forEach((key) => {
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
function jsonCamel2Line(obj: JsonValue): void {
  if (Array.isArray(obj)) {
    obj.forEach((v) => {
      jsonCamel2Line(v)
    })
  }
  else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    Object.keys(obj).forEach((key) => {
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
  jsonLine2Camel,
}

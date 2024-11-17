import antfu from '@antfu/eslint-config'

export default antfu({
  // 启用 TypeScript 支持
  typescript: true,
  // 启用 Vue 支持
  vue: true,
  // 启用 JSON 支持
  jsonc: true,
  // 启用 YAML 支持
  yaml: true,
  // 覆盖一些规则
})

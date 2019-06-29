Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    size: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: "default"
    },
    text: {
      type: String,
      value: ''
    }
  }
})
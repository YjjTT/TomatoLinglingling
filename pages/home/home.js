// pages/home/home.js
Page({
  data: {
    lists: [
      {
        id: 1, 
        text: "嘻嘻嘻嘻嘻嘻嘻", 
        finished: true,
      },
      {
        id: 2,
        text: "嘻嘻嘻嘻嘻嘻嘻ddasdas",
        finished: false,
      },
      {
        id: 3,
        text: "嘻嘻嘻嘻嘻嘻法法嘻",
        finished: true,
      },
      {
        id: 4,
        text: "嘻嘻嘻嘻嘎嘎嘎嘻嘻嘻",
        finished: false,
      }
    ],
    visibleConfirm: false,
  },
  confirmCreate(event){
    console.log(event)
    let content = event.detail
    if(content){
      let todo = [{ id: this.data.lists.length + 1, text: content, finished: false }]
      this.data.lists = todo.concat(this.data.lists)
      this.setData({
        lists: this.data.lists
      })
      this.hideCreateConfirm()
    }
  },
  hideCreateConfirm(event){
    this.setData({ visibleConfirm: false})
  },
  showConfirm(){
    this.setData({ visibleConfirm: true})
  },
  deleteTodo(event){
    console.log(event)
    let index = event.currentTarget.dataset.index
    console.log(index)
    this.data.lists[index].finished = true
    this.setData({ lists: this.data.lists })
  }
})
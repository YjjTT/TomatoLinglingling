// pages/me/me.js

Page({
  data: {
    tab: "tomato",
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow: function(){

  },
  changeTab(event){
    let name = event.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})
// pages/me/me.js
const {http} = require('../../lib/http.js')
Page({
  data: {
    tab: "tomato",
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow: function(){
    this.fetchTodos()
    this.fetchTomatoes()
    this.setData({ me: wx.getStorageSync('me') })
  },
  fetchTomatoes(){
    http.get('/tomatoes')
    .then(res=>{
      this.setData({tomatoes: res.response.data.resources})
    })
  },
  fetchTodos(){
    http.get('/todos', {
      is_group: "yes"
    })
    .then(res=>{
      this.setData({todos: res.response.data.resources})
    })
  },
  changeTab(event){
    let name = event.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})
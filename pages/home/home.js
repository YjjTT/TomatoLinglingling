// pages/home/home.js
const {http} = require('../../lib/http.js')

Page({
  updateId: '',
  updateIndex: '',
  data: {
    lists: [],
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false,
    updateContent: "",
  },

  onShow(){
    // let me = wx.getStorageSync('me')
    // if (me.account) {
      http.get('/todos').then(response => {
        this.setData({ lists: response.response.data.resources })
      })
    // } else {
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // }
  },

  confirmCreate(event) {
    let content = event.detail
    console.log(event.detail)
    if(content){
      http.post('/todos', {
          description: content
      })
        .then(response => {
          console.log(response)
          let todo = response.response.data.resource
          this.data.lists.push(todo)
          this.setData({
            lists: this.data.lists
          });
          this.hideCreateConfirm();
        })
    }
  },
  confirmUpdate(event){
    let content = event.detail
    http.put(`/todos/${this.updateId}`, {
      description: content
    })
      .then(response => {
        let todo = response.response.data.resource
        this.data.lists[this.updateIndex] = todo
        this.setData({ lists: this.data.lists })
        this.hideUpdateConfirm();
      })
  },

  changeText(event){
    console.log(event)
    let { content, id, index } = event.currentTarget.dataset
    this.updateId = id
    this.updateIndex = index
    this.setData({ visibleUpdateConfirm: true, updateContent: content})
  },

  hideCreateConfirm(event) {
    this.setData({ visibleCreateConfirm: false });
  },
  showCreateConfirm() {
    this.setData({ visibleCreateConfirm: true });
  },
  hideUpdateConfirm(){
    this.setData({ visibleUpdateConfirm: false });
  },
  updateTodo(event) {
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`, {
      completed: true
    })
    .then(response=>{
      let todo = response.response.data.resource
      this.data.lists[index] = todo
      this.setData({lists: this.data.lists})
    })
  }
});

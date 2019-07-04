// pages/home/home.js
const {http} = require('../../lib/http.js')

Page({
  data: {
    lists: [],
    visibleConfirm: false
  },

  onShow(){
    http.get('/todos').then(response=>{
      this.setData({ lists: response.response.data.resources})
    })
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
  hideCreateConfirm(event) {
    this.setData({ visibleConfirm: false });
  },
  showConfirm() {
    this.setData({ visibleConfirm: true });
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

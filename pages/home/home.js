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
          this.data.lists = todo.concat(this.data.lists);
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
  deleteTodo(event) {
    console.log(event);
    let index = event.currentTarget.dataset.index;
    console.log(index);
    this.data.lists[index].finished = true;
    this.setData({ lists: this.data.lists });
  }
});

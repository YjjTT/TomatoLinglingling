// pages/tomato/tomato.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 1500,
    formatTime: ""
  },

  
  onShow: function () {
    this.formatTime()
  },

  formatTime(){
    let m = Math.floor(this.data.time/60)
    let s = Math.floor(this.data.time%60)
    if(s === 0){
      s = "00"
    }
    if((s+"").length === 1){
      s = "0" + s
    }
    if ((m + "").length === 1) {
      m = "0" + m
    }
    this.setData({ formatTime: `${m}:${s}`})
  }
})
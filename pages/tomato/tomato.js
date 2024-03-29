// pages/tomato/tomato.js
const {http} = require('../../lib/http.js')
Page({

  timer: null,
  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 1500,
    formatTime: "",
    timerStatus: "stop",
    confirmVisable: false,
    againButtonVisable: false,
    tomato: {}
  },
  onShow: function () {
    this.beginCountdown()
    http.post('/tomatoes').then(res=>{
      console.log(res)
      this.setData({ 
        tomato: res.response.data.resource 
      })
    })
  },
  onHide(){
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: '退出放弃', aborted: true
    })
  },
  onUnload(){
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: '退出放弃', aborted: true
    })
  },
  beginCountdown(){
    this.setData({ timerStatus: "start" })
    this.formatTime()
    this.timer = setInterval(() => {
      this.data.defaultSecond--
      this.formatTime()
      if (this.data.defaultSecond === 0){
        this.setData({ againButtonVisable: true })
        this.clearTimer()
        return
      }
    }, 1000)
  },
  clearTimer(){
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus: "stop"})
  },

  showConfirm(){
    this.clearTimer()
    this.setData({ confirmVisable: true })
  },
  hideConfirm(){
    this.beginCountdown()
    this.setData({ confirmVisable: false })
  },
  confirmGiveup(event){
    console.log(event)
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content, aborted: true
    })
    .then(res=>{
      wx.navigateBack({
        to: -1
      })
    })
  },
  againTime(){
    this.setData({ defaultSecond: 1500, againButtonVisable: false })
    this.beginCountdown()
  },
  confirmFinish(event){
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content, aborted: true
    })
    .then(res=>{
      wx.navigateBack({
        to: -1
      })
    })
  },
  confirmCancel(){
    this.setData({ defaultSecond: 1500, againButtonVisable: false })
    this.formatTime()
  },
  formatTime(){
    let m = Math.floor(this.data.defaultSecond/60)
    let s = Math.floor(this.data.defaultSecond%60)
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
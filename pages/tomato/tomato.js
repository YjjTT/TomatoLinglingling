// pages/tomato/tomato.js
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
    againButtonVisable: false
  },

  
  onShow: function () {
    this.beginCountdown()
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
    let content = event.detail
    wx.navigateBack({
      to: -1
    })
  },
  againTime(){
    this.setData({ defaultSecond: 1500, againButtonVisable: false })
    this.beginCountdown()
  },
  confirmFinish(event){
    let content = event.detail
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
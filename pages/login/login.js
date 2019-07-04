// pages/login/login.js
const { http } = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login(event){
    console.log(event)
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
    let code
    wx.login({
      success(res){
        code = res.code
        http.post('/sign_in/mini_program_user', {
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret
        })
        .then(response=>{
          wx.setStorageSync('me', response.response.data.resource)
          wx.setStorageSync('X-token', response.response.header["X-token"])
          wx.reLaunch({
            url: '/pages/home/home',
          })
        })
      }
    })
  },

  onShow: function () {

  }
})
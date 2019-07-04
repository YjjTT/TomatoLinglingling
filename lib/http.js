
const { host, t_app_secret, t_app_id } = getApp().globalData

const _http = (method, url, data)=>{
  return new Promise((resolve, reject)=>{
    wx.request({
      url: `${host}${url}`,
      data,
      header:{
        Authorization : `Bearer ${wx.getStorageSync('X-token')}`,
        "t-app-id": t_app_id,
        "t-app-secret": t_app_secret
      },
      method,
      dataType: 'json',
      success: (response)=>{
        let statusCode = response.statusCode
        if(statusCode >= 400){
          if(statusCode === 401){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          reject({
            statusCode,
            response
          })
        }else{
          resolve({
            statusCode,
            response
          })
        }
      },
      fail: (errors)=>{
        wx.showToast({
          title: '请求失败',
        })
        reject(errors)
      }
    })
  })
}
const http = {
  get: (url, params) => _http('GET', url, params),
  post: (url, params) => _http('POST', url, params),
  put: (url, params) => _http('PUT', url, params),
  delete: (url, params) => _http('DELETE', url, params)
}

module.exports = {
  http
}
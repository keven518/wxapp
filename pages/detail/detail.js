// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let appDatas = getApp();
console.log('appDatas: ', appDatas)
let obj = {};

console.log('datas: ', datas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options: ', options);
    // 获取页面跳转的参数值
    let index = options.index;
    // 更新data中detailObj的状态
    this.setData({
      detailObj: datas.list_data[index],
      index
    });

    // 根据缓存判断是否收藏
    let storageIsCollected = wx.getStorageSync('isCollected');
    
    if(storageIsCollected){
      obj = storageIsCollected;
    }
    this.setData({
      isCollected: storageIsCollected[index] || false 
    })

    // 判断音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) { // 在播放
      this.setData({
        isMusicPlay: true
      });
    }

    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isMusicPlay: true
      });

      // 修改appDatas中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    });
    // 监听音乐暂停
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isMusicPlay: false
      });

      // 修改appDatas中的数据
      appDatas.data.isPlay = false;
    })
  },

  // 点击收藏
  handleCollection() {
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });

    // 提示用户
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    });

    let {index} = this.data;
    // 不可行，会覆盖之前的状态  
        
    obj[index] = isCollected;
    // 缓存数据到本地
    wx.setStorage({
      key: 'isCollected',
      data: obj,
      success() {
        console.log('缓存成功')
      }
    })
      
    
    
  },

  handleMusicPlay() {    
    // 处理音乐播放
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });

    // 控制音乐播放
    if (isMusicPlay) {
      // 播放音乐
      let { dataUrl, title } = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      // 暂停音乐
      wx.pauseBackgroundAudio()
    }
  },

  handleShare() {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享到qq空间', '分享到微博', 'kv', 
      ]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
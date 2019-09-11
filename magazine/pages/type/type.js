// pages/type/type.js
var myRequest = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;
    this.getTypeArticle(typeId);
  },

  getTypeArticle:function(typeId){
    var that = this;
    myRequest({
      url: 'getArticleTypeTitleInfo/'+typeId,
      success: function (res) {
        that.setData({
          articleType: res
        })
      }
    });
    myRequest({
      url: 'getArticleTypeList/'+typeId,
      success: function (res) {
        that.setData({
          articleTypeInfo: res
        })
      }
    });
  },

  onTap:function(e){
    var id = e.currentTarget.dataset.articleid;
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id='+id,
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
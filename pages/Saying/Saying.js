// pages/Saying/Saying.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceData:{},
    autoplay: true,
    indicatorDots: true,
    ImgUrls: [
      '/images/Swiper01.jpg',
      '/images/Swiper02.jpg',
      '/images/Swiper03.jpg'
    ],
    interval: 3000,
    showEnglish:true,
    showChinese:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.bindChange();
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

  },

  //刷新数据
  bindChange:function(){
    var that=this;
    wx.request({
      url: 'http://route.showapi.com/1211-1',
      data:{
        "showapi_appid": '86225',
        "showapi_sign": '0b8a456645c143a5ac1d2c61e7cb6aeb',
        "count": "5"
      },
      header: {
        'content-type': 'application/json' 
      },
      success(res){
        console.log(res);
        console.log(res.data.showapi_res_body.data);
        that.processSayingData(res.data.showapi_res_body.data);
      }
    })
  },
  processSayingData:function(SayingData){
    var Lists=[];
    for (var index in SayingData){
      var ListDetail = SayingData[index];
      if (ListDetail.chinese.length>49){
        ListDetail.chinese = ListDetail.chinese.substring(0,48)+"...";
      }
      if (ListDetail.english.length > 100) {
        ListDetail.english = ListDetail.english.substring(0, 98) + "...";
      }
      var temp={
        ChineseVersion: ListDetail.chinese,
        EnglishVersion: ListDetail.english,
      }
      console.log(ListDetail.english.length);
      Lists.push(temp);
    }
    this.setData({
      sourceData: Lists
    })
  },
  //切换语言版本
  bindChangeLanguage:function(){
    var that=this;
    var isEnglish=this.data.showEnglish;
    isEnglish = !isEnglish;
    var isChinese = this.data.showChinese;
    isChinese = !isChinese;
    this.setData({
      showEnglish: isEnglish,
      showChinese: isChinese,
    })
  }

})
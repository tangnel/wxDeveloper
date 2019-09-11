// pages/articleDetail/articleDetail.js
var myRequest = require("../../utils/request.js");
var myAudio = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail:{},     //文章详情列表对象集合
    hidePoster:true,      //是否隐藏视频海报
    playing:false,        //音频是否播放
    audioCurTime:0,       //音频当前时间
    progressPercent:0,    //进度条百分比
    circleLeft:0,         //小圆点距离左边的距离
    progressWidth:520,    //进度条总宽度
    audioOrignPageX:0,    //触摸小圆点最初的位置
    audioTouchFlag:false  //lock
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getData(id);
  },

  getData:function(id){
    var that = this;
    myRequest({
      url:'getArticleDetail/'+id,
      success:function(res){
        that.setData({
          articleDetail:res
        });
      }
    })
  },

  onVideoTap:function(){
    this.setData({
      hidePoster: false
    })
    var myVideo = wx.createVideoContext('myvideo');
    myVideo.play();
  },

  audioPlay:function(){
    myAudio.title = this.data.articleDetail.audio.title;
    myAudio.src = this.data.articleDetail.audio.src;
    this.listenAudioPlay();
    this.updateAudioData();
  },

  onAudioTap:function(){
    var playing = this.data.playing;
    

    if(playing){
      myAudio.pause();
    }else{
      this.audioPlay()
    }
    this.setData({
      playing: !playing
    })
   
  },

  listenAudioPlay:function(){
    var that = this;
    myAudio.onPause(function(){
      that.setData({
        playing:false
      })
    })

    myAudio.onStop(function(){
      that.setData({
        playing:false
      })
    })

    myAudio.onEnded(function(){
      that.setData({
        playing:false
      })
    })

    myAudio.onPlay(function(){
      that.setData({
        playing:true
      })
    })

  },

  updateAudioData:function(){
    var that = this;
    var duration = this.data.articleDetail.audio.duration;
   
    myAudio.onTimeUpdate(function(){
      var currentTime = myAudio.currentTime.toFixed();
      var percent = currentTime / duration *100;
      var circleLeft = currentTime / duration * that.data.progressWidth;
      that.setData({
        audioCurTime:currentTime,
        progressPercent:percent,
        circleLeft:circleLeft
      })
    })
  },

  audioTouchStart:function(e){
    var audioOrignPageX = e.touches[0].pageX * this.getPhoneRatio();

    if(!this.data.audioTouchFlag){
      this.setData({
        audioOrignPageX:audioOrignPageX,
        audioTouchFlag:true
      })
    }
    
  },

  audioTouchMove:function(e){
    var audioCurPageX = e.touches[0].pageX * this.getPhoneRatio();
    var circleLeft = audioCurPageX - this.data.audioOrignPageX;
    if(circleLeft<=0){
      circleLeft=0;
    }else if(circleLeft >= this.data.progressWidth){
      circleLeft = this.data.progressWidth;
    }

    var progressPercent = circleLeft / this.data.progressWidth * 100;
    var audioCurTime = (circleLeft / this.data.progressWidth * this.data.articleDetail.audio.duration).toFixed();
    
    this.audioPlay();
    myAudio.seek(Number(audioCurTime))

    this.setData({
      circleLeft:circleLeft,
      progressPercent:progressPercent,
      audioCurTime:audioCurTime
    })



  },

  getPhoneRatio(){
    var ratio = 0;
    wx.getSystemInfo({
      success:function(res){
        ratio = 750 / res.screenWidth
      }
    })
    return ratio;
  }
  
})
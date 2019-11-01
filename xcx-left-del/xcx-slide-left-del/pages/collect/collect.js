
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //收藏列表
    items: [
      {
        "id": "1",
        "url": "",
        "img": "../imgs/tp01.jpg",
        "title": "上得了厅堂，下得了厨房，杀得了木马，翻得了围墙，开得了汽车，买得起洋房，斗得了小三，打得赢流氓。",
        "price": "1000",
        "type": "0"
      },
      {
        "id": "2",
        "url": "",
        "img": "../imgs/tp02.jpg",
        "title": "现在演戏的都去唱歌了，唱不了歌的都去写书了，写不了书的都去演戏了，演不了戏的就又去唱歌了。演艺圈是个圈嘛。",
        "price": "2000",
        "type": "0"
      },
      {
        "id": "3",
        "url": "",
        "img": "../imgs/tp03.jpg",
        "title": "我们明明都会料到事情的结局，却要走一段很远的行程去探索它的意义，我们的路途，不过是在毫无意义的上演一个闹剧的圆。", 
        "price": "3000",
        "type": "1"
      },
    ],
    startX: 0, //开始坐标x
    startY: 0, //开始坐标y
  },

  
  //开始触摸时
  touchstart(e) {
    var that = this;
    that.data.items.forEach(function (v, i) {
      if (v.isTouchMove){
        v.isTouchMove = false;
      }
    })
    that.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: that.data.items
    })
  },

  //滑动事件处理
  touchmove(e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX){
          v.isTouchMove = false;  //右滑
        }else{
          v.isTouchMove = true; //左滑
        } 
      }
    })
   
    that.setData({
      items: that.data.items
    })
  },
 
  // 计算滑动角度 start 起点坐标  end 终点坐标
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  //取消收藏
  cancleCollect(e) {
    var that = this,
        index = e.currentTarget.dataset.index,
        items = that.data.items;
    items[index].isTouchMove = true; 
    that.setData({
      items: items
    })
    wx.showModal({
      title: '温馨提示',
      content: '亲，您确定要取消此收藏吗？',
      success(res) {
        if (res.confirm) {
          items.splice(index, 1);
          that.setData({
            items: items
          })
          wx.showToast({
            title: '取消收藏成功~',
            icon: 'success',
            duration: 1500
          })
        } else if (res.cancel) {
          items[index].isTouchMove = false;
          that.setData({
            items: items
          })
        }
      }
    })
  
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
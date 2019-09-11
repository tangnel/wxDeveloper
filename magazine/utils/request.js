
var baseUrl = "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/";
function myRequest(options){
    wx.request({
        url: baseUrl + options.url,
        success: function (res) {
          // console.log(key,res.data.data)
          if(res.data.code == 0){
            options.success(res.data.data);
          }else{
            showError();
          }
        },
        fail:function(){
            showError();
        }
      });
}

function showError(){
    wx.showToast({
        title:"请求错误",
        icon:"none"
    });
}
module.exports = myRequest;
$(function(){

$('.btn-login').on('tap',function(){

    var username=$('.username').val();
    var password=$('.password').val();
    if (!username) {
        // MUI的消息框 警告框
        mui.alert('请输入用户名！', '温馨提示', '知道了');
        // 只要没有输入后面的代码都不执行
        return false;
    }
    if (!password) {
        // MUI的消息框 警告框
        mui.alert('请输入密码！', '温馨提示', '知道了');
        // 只要没有输入后面的代码都不执行
        return false;
    }
    $.ajax({
        url:'/user/login',
        beforeSend: function() { // 请求之前会触发的回调函数
            // 请求之前显示遮罩层
            $('.mask').show();
        },
        complete: function() { // 请求之后会触发函数
            // 请求之后隐藏遮罩层
            $('.mask').hide();
        },
        type:'post',
        data:{username:username,password:password},
        success:function(data){
            if(data.success){
                var returnUrl=getQueryString('returnUrl');

                location=returnUrl;
            }else{
                mui.toast(data.message, { duration: 'long', type: 'div' })
            }
        }
    })

});
$('.btn-register').on('tap',function(){

    location='register.html';
})





   function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        // console.log(r);
        if (r != null) {
            //转码方式改成 decodeURI
            return decodeURI(r[2]);
        }
        return null;
    }
})
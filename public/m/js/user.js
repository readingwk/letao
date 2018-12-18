$(function(){

$('.btn-exit').on('tap',function(){

    $.ajax({
        url:'/user/logout',
        beforeSend: function() { // 请求之前会触发的回调函数
            // 请求之前显示遮罩层
            $('.mask').show();
        },
        complete: function() { // 请求之后会触发函数
            // 请求之后隐藏遮罩层
            $('.mask').hide();
        },
        success:function(data){
            if(data.success){
                location='login.html?returnUrl='+location.href;
            }
        }
    })
})

$.ajax({
    url:'/user/queryUserMessage',
    beforeSend: function() { // 请求之前会触发的回调函数
        // 请求之前显示遮罩层
        $('.mask').show();
    },
    complete: function() { // 请求之后会触发函数
        // 请求之后隐藏遮罩层
        $('.mask').hide();
    },
    success:function(data){
        if(data.error){
            location='login.html?returnUrl='+location.href;
        }else{
            $('.username').html(data.username);
            $('.mobile').html(data.mobile);
        }
    }
})

})
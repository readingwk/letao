

$(function(){


    var id=getQueryString('id');
    console.log(id);

    $.ajax({

        url:"/product/queryProductDetail",
        beforeSend: function() { // 请求之前会触发的回调函数
            // 请求之前显示遮罩层
            $('.mask').show();
        },
        complete: function() { // 请求之后会触发函数
            // 请求之后隐藏遮罩层
            $('.mask').hide();
        },
        data:{id:id},
        success:function(data){
            var min=data.size.split('-')[0]-0;

            var max=data.size.split('-')[1];

            data.size=[];
            for(var i=min;i<=max;i++){
                data.size.push(i);
            }

            var html=template('detailListTpl',data);
            $('#productDetail').html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            mui('.mui-slider').slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui('.mui-numbox').numbox();
            $('.btn-size').on('tap', function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }
    })

    $('.btn-add-cart').on('tap',function(){

        var size=$('.btn-size.active').data('size');

        if(!size){
            mui.toast('请选择尺码！', { duration: 3000, type: 'div' });
            return false;
        }

        var num=mui('.mui-numbox').numbox().getValue();
        if(!num){
            mui.toast('请选择数量!', { duration: 3000, type: 'div' });
            return false;
        }
        // 调用加入购物车的api

        $.ajax({
            url:'/cart/addCart',
            beforeSend: function() { // 请求之前会触发的回调函数
                // 请求之前显示遮罩层
                $('.mask').show();
            },
            complete: function() { // 请求之后会触发函数
                // 请求之后隐藏遮罩层
                $('.mask').hide();
            },
            type:'post',
            data:{productId:id,size:size,num:num},
            success:function(data){
                if(data.success){
                    mui.confirm('加入购物车成功！ 是否要去购物车查看?', 'hello 单身狗', ['去看','发呆','不看'], function(e){
                        if(e.index==0){
                            location='cart.html';
                        }else{
                            mui.toast('你继续加一件就可以脱离单身了！', { duration: 3000, type: 'div' });
                        }
                    })
                }else{
                    location='login.html?returnUrl='+location.href;
                }
               
            }
        })
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
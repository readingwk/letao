$(function(){

queryCartPaging();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var page=1;
mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        callback :function(){
            setTimeout(function(){
                queryCartPaging();

                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                // 11. 下拉结束后重置上拉加载的效果
                mui('#refreshContainer').pullRefresh().refresh(true);
                // 12. 把page也要重置为1
                page = 1;
            },1000)
        } 
      },
      up:{
          callback:function(){
        setTimeout(function(){
            page++;

            $.ajax({
                url:'/cart/queryCartPaging',
                data:{page:page,pageSize:4},
                success:function(data){
                    if(data.error){
                        location='login.html?returnUrl='+location.href;

                    }else{
                        if(data instanceof Array){
                            data={
                                data:data
                            }
                        }
                        if(data.data.lenghth>0){
                            var html=template('cartListTpl',data);
                            $('.cart-list').append(html);
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                        }else{
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    }
                }
            })
        },1000)
      }
    }
     }
  });

$('.cart-list').on('change','.choose',function(){

    var checkeds=$('.choose:checked');
  
    var sum=0;
    checkeds.each(function(index,value){
        var price=$('.choose').data('price');
        var num=$('.choose').data('num');

        var all=price*num;
        sum+=all;
    })
    sum=parseInt(sum*100)/100;
    $('.order-total span').html(sum);
})

// 取消按钮的点击事件
$('.cart-list').on('tap','.btn-delete',function(){
    var that=$(this);
    mui.confirm('您真的要删除我吗?','温馨提示',['确定','取消'],function(e){
        if(e.index==0){
            var id=$(that).data('id');
            $.ajax({
                url:'/cart/deleteCart',
                data:{id:id},
                success:function(data){
                    if(data.success){
                        queryCartPaging()
                    }
                }
            })
        }else if(e.index==1){
            mui.swipeoutClose($(that).parent().parent()[0]);
        }
    })

})

// 5. 编辑商品
    // 1. 点击编辑按钮弹出一个确认框
    // 2. 把商品尺码数量 的代码放到确认框里面
    // 3. 准备一个尺码和数量的模板
    // 4. 需要所有尺码 当前尺码 所有数量 当前数量  传入模板里面
    // 5. 把模板生成 放到确认框的内容里面
    // 6. 放上去了之后让尺码数量能够点击(放上去后初始化)
    // 7. 在确认框点击了确定 获取最新的尺码数量 去编辑 调用API传入参数  编辑成功刷新页面
    // 8. 点击了取消 就列表滑回去

    $('.cart-list').on('tap','.btn-exit',function(){
        var that=$(this)
        var product=$('.btn-exit').data('product');

        var min=product.productSize.split('-')[0];
        var max=product.productSize.split('-')[1];
        product.productSize=[];
        for(var i=min;i<=max;i++){
            product.productSize.push(i);
        }

        var html=template('cartExitTpl',product);

        html=html.replace(/[\r\n]/g, "");
        mui.confirm(html,'编辑商品',['确定','取消'],function(e){
            if(e.index==0){
                $.ajax({
                    url:'/cart/updateCart',
                    type:'post',
                    data:{id:product.id,
                            size:$('.btn-size.active').data('size'),
                            num:mui('.mui-numbox').numbox().getValue()},
                    success:function(data){
                        if(data.success){
                            queryCartPaging()
                        }
                    }
                })
            }else if(e.index==1){
                mui.swipeoutClose($(that).parent().parent()[0]);
            }
        })
        mui('.mui-numbox').numbox().setValue(product.num);
        $('.btn-size').on('tap', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

    })

    function queryCartPaging(){
        $.ajax({
            url:'/cart/queryCartPaging',
            data:{page:1,pageSize:4},
            success:function(data){
                if(data.error){
                    location='login.html?returnUrl='+location.href;
                }else{
                    if(data instanceof Array){
                        data={
                            data:data
                        }
                    }
                    var html=template('cartListTpl',data);
                    $('.cart-list').html(html);
                }
            }
        })
        
    }




})
$(function(){

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false//是否显示滚动条
    });


    $.ajax({
        url:'/category/queryTopCategory',
        beforeSend: function() { // 请求之前会触发的回调函数
            // 请求之前显示遮罩层
            $('.mask').show();
        },
        complete: function() { // 请求之后会触发函数
            // 请求之后隐藏遮罩层
            $('.mask').hide();
        },
        success:function(data){

            var html=template('categoryLeftTpl',data );
            $('.category-left ul').html(html);
        }

    });
$('.category-left ul').on('tap','li a',function(){
    //data 属性获取字定义属性
    var id=$(this).data('id');

    querySecondCategory(id);

    $(this).parent().addClass('active').siblings().removeClass('active');




})

    querySecondCategory(1)
    function querySecondCategory(id){
        $.ajax({

            url:'/category/querySecondCategory',
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
                var html=template('categoryRightTpl',data);
                $('.category-right ul').html(html);
            }
        })
    }
  



})
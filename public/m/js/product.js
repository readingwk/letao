$(function(){

var search=getQueryString('search');

queryProduct();

function queryProduct(){
    $.ajax({
        url:'/product/queryProduct',
        beforeSend: function() { // 请求之前会触发的回调函数
            // 请求之前显示遮罩层
            $('.mask').show();
        },
        complete: function() { // 请求之后会触发函数
            // 请求之后隐藏遮罩层
            $('.mask').hide();
        },
        data:{page:1,pageSize:4,proName:search},
        success:function(data){
            console.log(data);
            var html=template('productListTpl',data);
            $('.product-list .content ul').html(html);
        }
    })
    
}

$('.btn-search').on('tap',function(){
    search=$('.product-search').val();
    queryProduct();

})
var page=1;
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
          
            callback :function(){
                setTimeout(function(){
                    queryProduct();
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

                    mui('#refreshContainer').pullRefresh().refresh(true);
                    page=1;
                },1000)

            }
          },
          up:{

            callback:function(){

                setTimeout(function(){
                    page++;
                    $.ajax({
                        url:'/product/queryProduct',
                        beforeSend: function() { // 请求之前会触发的回调函数
                            // 请求之前显示遮罩层
                            $('.mask').show();
                        },
                        complete: function() { // 请求之后会触发函数
                            // 请求之后隐藏遮罩层
                            $('.mask').hide();
                        },
                        data:{page:page,pageSize:4,proName:search},
                        success:function(data){
                            console.log(data);
                            if(data.data.length>0){
                                var html=template('productListTpl',data);
                                $('.product-list .content ul').append(html);
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                            }else{
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }
                           
                        }
                    })
                    

                },1000)
            }
          }
        }
      });

      $('.product-list').on('tap','.btn-buy',function(){

            var id=$(this).data('id');
            location='detail.html?id='+id;
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
$(function(){

  
    // var history=[];
    $('form button').on('tap',function(){
        var history=$('form input').val();
        // history.unshift($('form input').val());
        // console.log(history);
        if(!history.trim()){
            alert('请输入要搜索的商品');
            return ;
        }
        var historyData=JSON.parse(localStorage.getItem('searchHistory'))|| [];

        if(historyData.indexOf(history)!=-1){
            historyData.splice(historyData.indexOf(history),1);
        }

        historyData.unshift(history);
        localStorage.setItem('searchHistory',JSON.stringify(historyData));
        queryHistory();
        location='product.html?search='+history;
        
    })
    queryHistory()

function queryHistory(){

  var historyData=JSON.parse(localStorage.getItem('searchHistory'))|| [];
  historyData={rows:historyData};
  var html =template('searchHistory',historyData)
  console.log(html);
  $('.search-history .mui-table-view').html(html);


    }


    $('.mui-table-view').on('tap','.btn-delete',function(){

        var index=$(this).data('index');

        var historyData=JSON.parse(localStorage.getItem('searchHistory'))|| [];

        historyData.splice(index,1);

        localStorage.setItem('searchHistory',JSON.stringify(historyData));

        queryHistory();


    })

    $('.btn-clear').on('tap',function(){

        localStorage.removeItem('searchHistory');

        queryHistory();
    })
})
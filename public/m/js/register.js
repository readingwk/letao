$(function(){



// var password1=$('.password1').val();
// var password2=$('.password2').val()
 /*1. 注册功能
    	1. 点击注册按钮 进行 非空验证  （使用MUI验证代码）
    	2. 有很多表单挨个获取判断很麻烦 获取所有表单 循环遍历 只要有一个为空表示有错 提示用输入
    	3. 获取用户输入所有信息
    		验证手机是否合法
    		延迟用户名是否合法
    		验证2次密码是否一致
    		验证码是否一致
    */
    var vCode='';
    $('.btn-register').on('tap',function(){
        var check=true;
        mui(".mui-input-group input").each(function() {
            //若当前input为空，则alert提醒 
            if(!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
            }); //校验通过，继续执行业务逻辑 
            if(check){
                // mui.alert('验证通过!')
                var mobile=$('.mobile').val();
                if(!(/^1[34578]\d{9}$/.test(mobile))){
                    mui.alert('手机号不合法!');
                    return false;
                }

                var username=$('.username').val();
                if(username.length>10){
                    mui.alert('用户名不能超过10位');
                    return false;
                }
                var password1=$('.password1').val();
                var password2=$('.password2').val()
                if(password1!=password2){
                    mui.alert('2次密码不一致!');
                    return false;
                }

                var vcode=$('.vcode-content').val();
                if(vCode!=vcode){
                    mui.alert('验证码输入有误!');
                    return false;
                }

                $.ajax({
                    url:'/user/register',
                    beforeSend: function() { // 请求之前会触发的回调函数
                        // 请求之前显示遮罩层
                        $('.mask').show();
                    },
                    complete: function() { // 请求之后会触发函数
                        // 请求之后隐藏遮罩层
                        $('.mask').hide();
                    },
                    type:'post',
                    data:{username:username,password:password1,mobile:mobile,vCode:vCode},
                    success:function(data){
                        if(data.success){
                            mui.toast('注册成功');
                            location='login.html?returnUrl=user.html';
                        }else{
                            mui.toast(data.message);
                        }
                    }
                })
            }
                    
    })


    $('.btn-vcode').on('tap',function(){

        $.ajax({
            url:'/user/vCode',
            beforeSend: function() { // 请求之前会触发的回调函数
                // 请求之前显示遮罩层
                $('.mask').show();
            },
            complete: function() { // 请求之后会触发函数
                // 请求之后隐藏遮罩层
                $('.mask').hide();
            },
            // type:'post',
            success:function(data){
                console.log(data.vCode);
                vCode=data.vCode;
            }
        })

    })

})
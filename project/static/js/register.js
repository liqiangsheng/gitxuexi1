alert('注册页面的js');

$('#register-btn').on('click', function(){
    var user = $('#user')[0].value;
    var psd = $('#psd')[0].value;
    var comfirmPsd = $('#comfirmPsd')[0].value;

    //判断用户名、密码、确认密码是否都不为空
    // 密码和确认密码是否相等
    // 发送请求
    $.post('/api/register', {
        username: user,
        password: psd,
        comfirmPassword: comfirmPsd
    }, function(result){
        //后台响应了注册
        console.log(result);
        if(result.code == 0){
            //跳转到登录页面
            window.location.href = '/login';
        }else{
            alert(result.message);
        }
    })

})

alert('登录页面的js');

$('#login-btn').on('click', function(){
    var user = $('#user')[0].value;
    var psd = $('#psd')[0].value;

    //判断用户名、密码是否都不为空
    // 发送请求
    $.post('/api/login', {
        username: user,
        password: psd
    }, function(result){
        //后台响应了登录
        console.log(result);
        if(result.code == 0){
            //登录成功，跳转到首页
            window.location.href = '/';
        }else{
            //登录错误的信息
            alert(result.message);
        }
        
    })

})

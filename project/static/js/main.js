$('#logout').on('click', function(){
    // 执行退出请求操作
    $.get('/api/logout', function(result){
        console.log(result);
        if(result.code == 0){
            window.location.reload();
        }else{
            alert('退出失败');
        }
    })
})
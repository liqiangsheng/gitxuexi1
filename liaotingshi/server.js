//能够接收websocket的请求的服务器
let ws = require('ws');

// 创建服务器,创建完毕之后，直接启动服务
let webSocketServer = new ws.Server({
    port: 5000
});

let wsArr = [];

//监听客户端/页面的连接
webSocketServer.on('connection', (ws)=>{

    console.log('用户上线了');
    wsArr.push(ws);

    ws.on('message', (data)=>{

        if(!ws.name){
            ws.name = data;
        }
        else{
            console.log('接收到了客户端数据：'+data);
            //向其他用户发送这个用户说的话
            wsArr.map((wsItem)=>{
                
                if(wsItem.name == ws.name){//自己

                }else{//其他用户
                    console.log('向其他用户发送信息');
                    wsItem.send(ws.name+':'+data);
                }
            })
        }
        
    })

    ws.on('close', ()=>{
        console.log('用户下线了');
    })

    ws.on('error', ()=>{
        console.log('连接中断了');
    })

})


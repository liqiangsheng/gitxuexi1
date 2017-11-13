全局安装webpack
npm install webpack -g

在项目路径执行
npm init
--save    -S(代码依赖，生产依赖)
--dev-save    -D    (开发依赖)
npm install webpack -D




webpack编译:
webpack '编译文件的路径' '编译完成输入文件的路径'

编译的文件：必须是项目的入口文件，其他的文件都是项目依赖文件  --src
输入的文件：项目真正需要执行的文件。  --dist

dist
lib
src


服务
webpack-dev-server
全局安装
npm install webpack-dev-server -g
本地安装
npm install webpack-dev-server -D
开启服务器
webpack-dev-server




上线：执行webpack    得到编译的代码用来上线
webpack -p 混淆压缩代码
webpack --progress 显示编译进度

开发：执行webpack-dev-server   在src文件夹执行对项目执行开发，服务器就会进行编译，将代码部署在服务器上
webpack-dev-server --port 8000  修改默认端口号
webpack-dev-server --open  打开浏览器
webpack-dev-server --progress  显示编译进度
















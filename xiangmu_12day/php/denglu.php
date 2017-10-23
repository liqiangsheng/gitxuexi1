<?php
//支持跨域访问
header('Access-Control-Allow-Origin: *');

//接收前端提交过来的参数
$phone = $_POST["phone"];
$pwd = $_POST["pwd"];

//连接MySql, 登录
$conn = new mysqli("127.0.0.1", "root", "", "mydb2") or die("连接失败");
$sql = "select * from zuanshixiaoniao where phone='$phone' and password='$pwd'";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    $arr = array("status"=>1, "msg"=>"登录成功！");
    echo json_encode($arr);
}
else  {
    $arr = array("status"=>0, "msg"=>"用户名或密码错误，请检查!");
    echo json_encode($arr);
}

$conn->close();
<?php
//支持跨域访问
//header("Content-Type:text/html; charset=utf-8");
  header('Access-Control-Allow-Origin: *');
//接受前端传来的资料
 $phone=$_POST["phone"];
//echo $phone;
 $pwd=$_POST["pwd"];

////连接数据
$conn = new mysqli("127.0.0.1", "root", "", "mydb2") or die("连接失败");
//
////判断用户名是否已经存在
$sql="select * from zuanshixiaoniao where phone='$phone'";
$result=$conn->query($sql);
if($result && $result->num_rows > 0){
    $arr=array("status"=>0,"msg"=>"手机已经存在");
    echo json_encode($arr);
}else{
    //插入数据， 注册
    $sql="insert into zuanshixiaoniao(phone,password) values('$phone','$pwd')";
    $result=$conn->query($sql);
    if($result){
        $arr=array("status"=>1,"msg"=>"注册成功");
        echo json_encode($arr);
    }else{
        $arr = array("status"=>0, "msg"=>$result);
        echo  json_encode($arr);
    }
}
$conn->close();



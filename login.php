<?php
session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

if($request['username'] == 'vijithvijayan1985@gmail.com' && $request['password'] == '12345'){
	echo json_encode(array('status'=>'SUCCESS','msg'=>'Logged in Successfully', 'user'=>array('id'=>session_id(), 'uname'=>'vijithv.cuelogic')));
}else{
	echo json_encode(array('status'=>'FAIL','msg'=>'Login Failed!'));
}

?>
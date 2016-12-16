<?php

$result=array();
echo $_REQUEST["search"];
$result["status"]="success";
$result["data"]="1,12,2,3";
echo json_encode($result);


?>
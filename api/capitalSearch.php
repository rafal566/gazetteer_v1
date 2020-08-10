<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$appid = "356f759672fc4bc28b04674d1ccc7aa8";
$capital = $_REQUEST['q'];


$curl = curl_init('https://api.opencagedata.com/geocode/v1/json?q=' . urlencode($capital) . '&key=' . $appid);

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $result = curl_exec($curl);

  echo(json_encode($result, true));

?>

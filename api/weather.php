<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$appid = "d2060b05162f32f39c2558c72dc66a24";
$lat=$_REQUEST['lat'];
$lon=$_REQUEST['lon'];
// https://api.openweathermap.org/data/2.5/onecall?lat=52.466436099999996&lon=-1.9874653999999998&exclude=hourly&appid=d2060b05162f32f39c2558c72dc66a24&units=metric
$curl = curl_init('https://api.openweathermap.org/data/2.5/onecall?lat=' . urlencode($lat) . '&lon=' . urlencode($lon) . '&exclude=hourl&appid=' . $appid . '&units=metric');

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $result = curl_exec($curl);

  echo(json_encode($result, true));

?>

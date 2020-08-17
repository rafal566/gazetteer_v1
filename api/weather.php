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

  $json_result = curl_exec($curl);

  /////////////////////////////////
  $searchResult = [];
  $searchResult['results'] = [];
  $temp = [];

  $r = json_decode($json_result, true);

  if(!isset(($r['current']['sunrise'])) && !isset(($r['current']['sunset']))) {
    $temp['today']['sunrise'] = 0;
    $temp['today']['sunset'] = 0;
    weather($temp['today']['sunrise'], $temp['today']['sunset']);
  } else {
    $temp['today']['sunrise'] = $r['current']['sunrise'];
    $temp['today']['sunset'] = $r['current']['sunset'];
    weather($temp['today']['sunrise'], $temp['today']['sunset']);
  }

  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode($searchResult, JSON_UNESCAPED_UNICODE);


function weather ($sunrise, $sunset) {
      global $r;
      global $searchResult;
      global $temp;
      $temp['today']['time'] = $r['current']['dt'];
      $temp['today']['timezone_offset'] = $r['timezone_offset'];
      $temp['today']['sunrise'] = $sunrise;
      $temp['today']['sunset'] = $sunset;

      $temp['today']['temp'] = $r['current']['temp'];
      $temp['today']['condition'] = $r['current']['weather'][0]['main'];
      $temp['today']['wind_speed'] = $r['current']['wind_speed'];
      $temp['today']['pressure'] = $r['current']['pressure'];
      $temp['today']['humidity'] = $r['current']['humidity'];
      $temp['today']['icon'] = $r['current']['weather'][0]['icon'];

      $temp['tomorrow']['temp'] = $r['daily'][1]['temp']['day'];
      $temp['tomorrow']['condition'] = $r['daily'][1]['weather'][0]['main'];
      $temp['tomorrow']['wind_speed'] = $r['daily'][1]['wind_speed'];
      $temp['tomorrow']['pressure'] = $r['daily'][1]['pressure'];
      $temp['tomorrow']['humidity'] = $r['daily'][1]['humidity'];
      $temp['tomorrow']['icon'] = $r['daily'][1]['weather'][0]['icon'];

      $temp['after_tomorrow']['temp'] = $r['daily'][2]['temp']['day'];
      $temp['after_tomorrow']['condition'] = $r['daily'][2]['weather'][0]['main'];
      $temp['after_tomorrow']['wind_speed'] = $r['daily'][2]['wind_speed'];
      $temp['after_tomorrow']['pressure'] = $r['daily'][2]['pressure'];
      $temp['after_tomorrow']['humidity'] = $r['daily'][2]['humidity'];
      $temp['after_tomorrow']['icon'] = $r['daily'][2]['weather'][0]['icon'];

      array_push($searchResult['results'], $temp);
    }

  /////////////////////////////////////
  //
  // echo(json_encode($json_result, true));

?>

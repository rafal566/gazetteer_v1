<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$appid = "356f759672fc4bc28b04674d1ccc7aa8";
$query = $_REQUEST['q'];
// print_r($capital);

$curl = curl_init('https://api.opencagedata.com/geocode/v1/json?q=' . urlencode($query) . '&key=' . $appid);

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $json_result = curl_exec($curl);

  //////////////////////////////

  $searchResult = [];
  $searchResult['results'] = [];
  $temp = [];

  $r = json_decode($json_result, true);

  $country = $r['results'][0]['components']['country'];
  $temp['capitalLat'] = $r['results'][0]['geometry']['lat'];
  $temp['capitalLng'] = $r['results'][0]['geometry']['lng'];

  if ($country == "Brazil") {
      $temp['capitalLat'] = $r['results'][1]['geometry']['lat'];
      $temp['capitalLng'] = $r['results'][1]['geometry']['lng'];
      array_push($searchResult['results'], $temp);
    } else if ($country == "Israel") {
      $temp['capital'] = "Jerusalem";
      $temp['capitalLat'] = 31.7683;
      $temp['capitalLng'] = 35.2137;
      array_push($searchResult['results'], $temp);
    } else {
      array_push($searchResult['results'], $temp);
    }

    echo json_encode($searchResult, JSON_UNESCAPED_UNICODE);
    header('Content-Type: application/json; charset=UTF-8');

  ////////////////////////////

  // echo(json_encode($json_result, true));

?>

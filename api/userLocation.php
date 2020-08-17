<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$username = "rafal566";
$lat=$_REQUEST['lat'];
$lng=$_REQUEST['lng'];

$curl = curl_init('http://api.geonames.org/findNearbyPlaceNameJSON?lat=' . urlencode($lat) . '&lng=' . urlencode($lng) . '&username=' . $username);

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $json_result = curl_exec($curl);

  $searchResult = [];
  $searchResult['results'] = [];
  $temp = [];

  $r = json_decode($json_result, true);
  $result = $r['geonames'][0];

  $temp['countryCode'] = $result['countryCode'];
  $temp['locationName'] = $result['name'];
  $temp['adminName'] = $result['adminName1'];
  array_push($searchResult['results'], $temp);

  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode($searchResult, JSON_UNESCAPED_UNICODE);

?>

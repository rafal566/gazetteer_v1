<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$username = "rafal566";
$country = $_REQUEST['country'];

$curl = curl_init('http://api.geonames.org/countryInfoJSON?country=' . urlencode($country) . '&username=' . $username);

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

  $temp['geometry']['south'] = $result['south'];
  $temp['geometry']['north'] = $result['north'];
  $temp['geometry']['east'] = $result['east'];
  $temp['geometry']['west'] = $result['west'];

  $temp['countryName'] = $result['countryName'];
  $temp['capital'] = $result['capital'];
  $temp['continentName'] = $result['continentName'];
  $temp['area'] = $result['areaInSqKm'];

  if ($temp['countryName'] == "Fiji" || $temp['countryName'] == "New Zealand" || $temp['countryName'] == "Kiribati") {
    $temp['geometry']['east'] = ($result['east'] + 360);
    array_push($searchResult['results'], $temp);
  } else if($temp['countryName'] == "Equatorial Guinea") {
    $temp['geometry']['south'] = -1.6732;
    $temp['geometry']['north'] = 3.9890;
    $temp['geometry']['east'] = 11.3599;
    $temp['geometry']['west'] = 5.4173;
    array_push($searchResult['results'], $temp);
  } else if($temp['countryName'] == "Russian Federation") {
    $temp['geometry']['south'] = 41.1851;
    $temp['geometry']['north'] = 82.0586;
    $temp['geometry']['east'] = 180;
    $temp['geometry']['west'] = -180;
    array_push($searchResult['results'], $temp);
  } else if($temp['countryName'] == "Svalbard and Jan Mayen") {
    $temp['geometry']['south'] = 74.1354;
    $temp['geometry']['north'] = 81.0281;
    $temp['geometry']['east'] = 34.6891;
    $temp['geometry']['west'] = 9.4209;
    array_push($searchResult['results'], $temp);
  } else {
    array_push($searchResult['results'], $temp);
  }

  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode($searchResult, JSON_UNESCAPED_UNICODE);

?>

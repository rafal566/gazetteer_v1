<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$username = "rafal566";
$lat=$_REQUEST['lat'];
$lng=$_REQUEST['lng'];
// data: 'lat=' + latitude + '&lng=' + longitude,
$curl = curl_init('http://api.geonames.org/findNearbyPlaceNameJSON?lat=' . urlencode($lat) . '&lng=' . urlencode($lng) . '&username=' . $username);

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $result = curl_exec($curl);

  echo(json_encode($result, true));

?>

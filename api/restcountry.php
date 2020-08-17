<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$country = $_REQUEST['country'];

$curl = curl_init('https://restcountries.eu/rest/v2/alpha/' . urlencode($country));

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $json_result = curl_exec($curl);
  // echo ($json_result);

  //////////////////
    $searchResult = [];
    $searchResult['results'] = [];
    $temp = [];

    $r = json_decode($json_result, true);
    // echo ($json_result);

    $temp['currencies']['name'] = $r['currencies'][0]['name'];
    $temp['currencies']['code'] = $r['currencies'][0]['code'];
    $temp['callingCodes'] = $r['callingCodes'];
    $temp['population'] = $r['population'];
    $tempLang['languages'] = $r['languages'];

  //////////////////
    $lang = [];
    for ($i = 0; $i <= count($tempLang['languages'])-1; $i++) {
      array_push($lang, $tempLang['languages'][$i]['name']);
    }

    $temp['languages'] = join(", ",$lang);

    if($temp['languages'] && $temp['population'] && $temp['callingCodes'][0] !== "" && $temp['callingCodes'][0] !== null &&
    $temp['currencies']['name'] !== " " && $temp['currencies']['name'] !== null && $temp['currencies']['code'] !== ""
    && $temp['currencies']['code'] !== null && $temp['currencies']['code'] !== "(none)") {
      $temp['currencies']['name'] = $r['currencies'][0]['name'];
      $temp['currencies']['code'] = $r['currencies'][0]['code'];
      $temp['callingCodes'] = $r['callingCodes'];
      $temp['population'] = $r['population'];
      $tempLang['languages'] = $r['languages'];
      array_push($searchResult['results'], $temp);
    } else if ($temp['callingCodes'][0] == "" || $temp['callingCodes'][0] == null){
      $temp['currencies']['name'] = $r['currencies'][0]['name'];
      $temp['currencies']['code'] = $r['currencies'][0]['code'];
      $temp['callingCodes'] = "No info avaiable";
      $temp['population'] = $r['population'];
      $tempLang['languages'] = $r['languages'];
      array_push($searchResult['results'], $temp);
    } else {
      $temp['currencies']['name'] = "No info avaiable";
      $temp['currencies']['code'] = "No info avaiable";
      $temp['callingCodes'] = $r['callingCodes'];
      $temp['population'] = $r['population'];
      $tempLang['languages'] = $r['languages'];
      array_push($searchResult['results'], $temp);
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($searchResult, JSON_UNESCAPED_UNICODE);
  ////////////////////

?>

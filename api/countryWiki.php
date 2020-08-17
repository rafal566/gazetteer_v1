<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

$username = "rafal566";
$title = $_REQUEST['title'];
// print_r($title);
// $countryCode = $_REQUEST['countryCode'];

$curl = curl_init('http://api.geonames.org/wikipediaSearchJSON?title=' . urlencode($title) .'&maxRows=100&username=' . $username);

  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $json_result = curl_exec($curl);
////////////////////////////////////////

$searchResult = [];
$searchResult['results'] = [];
$temp = [];

$r = json_decode($json_result, true);
$results = $r['geonames'];
// print_r(count($results));
// print_r($countryName);

for ($i = 0; $i <= count($results)-1; $i++) {
      // $wikiEntryTitle = $r['geonames'][$i]['title'];
      // $wikiCountryCode = $r['geonames'][$i]['countryCode'];
      // print_r($wikiCountryCode);
      if(isset($r['geonames'][$i]['feature'])) {
        $wikiFeature = $r['geonames'][$i]['feature'];
          if($wikiFeature === 'country' || $wikiFeature === 'isle' || $wikiFeature === 'adm1st' ||
            $r['geonames'][$i]['title'] === $title) {
            $temp['link'] = ($r['geonames'][$i]['wikipediaUrl']);
            array_push($searchResult['results'], $temp);
          }
        } else if (isset($r['geonames'][$i]['title'])) {
            $wikiTitle = $r['geonames'][$i]['title'];
              if($wikiTitle === $title) {
                $temp['link'] = ($r['geonames'][$i]['wikipediaUrl']);
                array_push($searchResult['results'], $temp);
          }
        }
      }


header('Content-Type: application/json; charset=UTF-8');
echo json_encode($searchResult, JSON_UNESCAPED_UNICODE);

//////////////////////////////////////
  // echo(json_encode($json_result, true));

?>

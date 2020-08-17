<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- stylesheets -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <link rel="stylesheet" href="styles/style.css">
  <link rel="icon" href="styles/icons/earth.ico">
  <link rel="stylesheet" href="https://ppete2.github.io/Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.css" />

  <!-- draw map -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css" />

  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"> -->

  <!-- icons -->
  <!-- <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
  <link rel="stylesheet" href="css/leaflet.awesome-markers.css"> -->

  <title>Gazetteer</title>
</head>

<!-- preloader -->

<body>
  <div id="preloaderContainer">
    <div id="preloader">&nbsp;</div>
  </div>


  <!-- <section id="top"> -->
    <!-- Search Bar -->
    <!-- <nav id="nav-bar">
      <form autocomplete="off" action="" method="post" id="mySearchForm">
        <div class="autocomplete">
          <input id="myInput" type="text" name="myCountry" placeholder="Type country or click map">
        </div>
        <input class="submitButton" type="submit" value="Search">
      </form>
    </nav> -->


<!-- select -->
<nav id="nav-bar">
<form action="" method="post" id="mySearchForm">
  <lable for="myInput"></lable>
  <select id="myInput" name="myCountry"  onchange="formSubmit()">
              <option value="">Select country from the list</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Aland Islands">Åland Islands</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <!-- <option value="Bouvet Island">Bouvet Island</option> -->
              <option value="Brazil">Brazil</option>
              <!-- <option value="British Indian Ocean Territory">British Indian Ocean Territory</option> -->
              <option value="Brunei Darussalam">Brunei Darussalam</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">Central African Republic</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo, Republic of">Congo, Republic of</option>
              <option value="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern and Antarctic Lands">French Southern Territories</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <!-- <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option> -->
              <option value="Holy See (Vatican City)">Holy See (Vatican City State)</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Ivory Coast">Ivory Coast</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
              <option value="Korea, Republic of">Korea, Republic of</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macau">Macao</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
              <option value="Moldova, Republic of">Moldova, Republic of</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <!-- <option value="Montserrat">Montserrat</option> -->
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <!-- <option value="Netherlands Antilles">Netherlands Antilles</option> -->
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Northern Mariana Islands">Northern Mariana Islands</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestine, State of">Palestinian Territory, Occupied</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Pitcairn">Pitcairn</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Reunion">Reunion</option>
              <option value="Romania">Romania</option>
              <option value="Russian Federation">Russian Federation</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Barthelemy">Saint Barthelemy</option>
              <option value="Saint Helena">Saint Helena</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Martin (French part)">Saint Martin (French part)</option>
              <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syrian Arab Republic">Syrian Arab Republic</option>
              <option value="Taiwan, Province of China">Taiwan, Province of China</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-Leste">Timor-Leste</option>
              <option value="Togo">Togo</option>
              <!-- <option value="Tokelau">Tokelau</option> -->
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <!-- <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option> -->
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Virgin Islands, British">Virgin Islands, British</option>
              <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
              <option value="Wallis and Futuna">Wallis and Futuna</option>
              <option value="Western Sahara">Western Sahara</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
  </select>
</form>
</nav>

<!-- map -->
<div id="map"></div>

<!-- </section> -->



<h2 class="NoCapitalInfo"></h2>
  <!-- main info container -->
  <section id="content">
    <div class="card-group infoContainer" id="firstContainer">
      <!-- <h2 class="NoCapitalInfo"></h2> -->
      <div class="left" id="capitalInfo">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th>
                <h5>Location</h3>
              </th>
              <td>
                <h2 class="location"></h2>
              </td>
            </tr>
            <tr>
              <th>
                <h5>Latitude</h3>
              </th>
              <td>
                <h6 class="latitude"></h6>
              </td>
            </tr>
            <tr>
              <th>
                <h5>Longitude</h3>
              </th>
              <td>
                <h6 class="longitude">
              </td>
            </tr>
            <tr>
              <th>
                <h5>Sunrise</h3>
              </th>
              <td>
                <h6 class="sunrise">
              </td>
            </tr>
            <tr>
              <th>
                <h5>Sunset</h3>
              </th>
              <td>
                <h6 class="sunset">
              </td>
            </tr>
            <tr>
              <th>
                <h5>Local time</h3>
              </th>
              <td>
                <h6 class="localTime">
              </td>
            </tr>
            <tr>
              <th>
                <h5>Local date</h3>
              </th>
              <td>
                <h6 class="localDate">
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="right" id="weatherInfo">
        <div id="carouselExampleControls" class="carousel slide" data-interval="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div id="weatherDescritptionToday">
                <h2 class=weather>Today</h2>
                <div id=weatherImageToday></div>
                <div id="weatherMainToday">
                  <p id=temperatureToday></p>
                  <p id=weatherDescriptionHeaderToday></p>
                </div>
                <hr>
                <p id=windSpeedToday></p>
                <p id=pressureToday></p>
                <p id=humidityToday></p>
              </div>
            </div>
            <div class="carousel-item">
              <div id="weatherDescriptionDay1">
                <h2 class=weather>Tomorrow</h2>
                <div id=weatherImageDay1 class="card-img-top"></div>
                <div id="weatherMainDay1">
                  <p id=temperatureDay1></p>
                  <p id=weatherDescriptionHeaderDay1></p>
                </div>
                <hr>
                <p id=windSpeedDay1></p>
                <p id=pressureDay1></p>
                <p id=humidityDay1></p>
              </div>
            </div>
            <div class="carousel-item">
              <div id="weatherDescritptionDay2">
                <h2 class=weather>After Tomorrow</h2>
                <div id=weatherImageDay2 class="card-img-top"></div>
                <div id="weatherMainDay2">
                  <p id=temperatureDay2></p>
                  <p id=weatherDescriptionHeaderDay2></p>
                </div>
                <hr>
                <p id=windSpeedDay2></p>
                <p id=pressureDay2></p>
                <p id=humidityDay2></p>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <!-- <span class="sr-only">Previous</span> -->
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <!-- <span class="sr-only">Next</span> -->
          </a>
        </div>
      </div>
    </div>
    <div class="card-group infoContainer">
      <div class="left">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th>
                  <h2>Country</h2>
                </th>
                <td><h6 class="country"></h6></td>
              </tr>
              <tr>
                <th>
                  <h5>Continent</h3>
                </th>
                <td><h6 class="continent"></h6></td>
              </tr>
              <tr>
                <th>
                  <h5>Flag</h3>
                </th>
                <td class="flag">
                  <img class="flagImage" />
                </td>
              </tr>
              <!-- <tr>
                <th>
                  <h5>Calling Code</h3>
                </th>
                <td><h6 class="callingCode"></h6></td>
              </tr> -->
              <tr>
                <th>
                  <h5>Area [km<sup>2</sup>]</h3>
                </th>
                <td><h6 class="area"</h6></td>
              </tr>
              <tr>
                <th>
                  <h5>Population</h3>
                </th>
                <td><h6 class="population"></h6></td>
              </tr>
              <!-- <tr>
                <th>
                  <h5>Languages</h3>
                </th>
                <td><h6 class="languages"></h6></td>
              </tr> -->
          </table>
        </div>
      </div>
      <div class="right">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th>
                <h5>Currency</h5>
              </th>
              <td>
                <h6 class="currencyName"></h6>
              </td>
            </tr>
            <tr>
              <th>
                <h5>Currency Code</h3>
              </th>
              <td>
                <h6 class="currencyCode"></h6>
              </td>
            </tr>
            <tr>
              <th>
                <h5>Calling Code</h3>
              </th>
              <td><h6 class="callingCode"></h6></td>
            </tr>
            <tr>
              <th>
                <h5>Languages</h3>
              </th>
              <td><h6 class="languages"></h6></td>
            </tr>
            <tr>
              <th>
                <h5>Wiki info</h3>
              </th>
              <td><a class="country wikiLink" href="" target="_blank"></a></td>
            </tr>
            <!-- <tr>
              <th>
                <h5>Wiki info</h3>
              </th>
              <td><h6 class="wikiInfo"></h6></td>
            </tr> -->
          </table>
        </div>
        <!-- <div id="currencyExchangeContainer">
          <div class="currencyExchange"><a href="https://www.exchangeratewidget.com/" rel="nofollow">Currency Converter</a></div>
          <script type="text/javascript" src="//www.exchangeratewidget.com/converter.php?l=en&f=USD&t=EUR&a=1&d=EBECF1&n=FFFFFF&o=000000&v=1"></script>
        </div> -->
      </div>
    </div>
</section>

  <!-- Font -->
  <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat|Ubuntu&display=swap" rel="stylesheet">
  <!-- Bootstrap scripts -->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

  <!-- map & jquery scripts -->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js"></script>
  <script src="https://ppete2.github.io/Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.js"></script>

  <!-- <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/" charset="utf-8"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js" charset="utf-8"></script> -->

  <!-- my scripts -->
  <script src="js/borders.js" charset="utf-8"></script>
  <script src="js/countries.js" charset="utf-8"></script>
  <script src="js/app.js" charset="utf-8"></script>
  <script src="js/leaflet.js" charset="utf-8"></script>
</body>

</html>

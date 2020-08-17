// jshint esversion:6
$(window).on('load', function() { // makes sure the whole site is loaded
  $("#content").hide();
  $(".NoCapitalInfo").hide();
  $('#preloader').fadeOut(); // will first fade out the loading animation
  $('#preloaderContainer').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(500).css({
    'overflow': 'visible'
  });
});

$(window).on('load', function() {
  // $("#content").show();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findUserPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
    mymap = L.map('map').setView([0, 0], 2);
  }
});


//finding user's position
function findUserPosition(position) {
  if (position.coords.latitude && position.coords.longitude) {
    $("#content").show();
    let latitude = Math.floor(position.coords.latitude * 10000) / 10000;
    let longitude = Math.floor(position.coords.longitude * 10000) / 10000;
    // let latitude = 32.1;
    // let longitude = 35.2;
    $.ajax({
      type: "POST",
      url: "api/userLocation.php",
      cache: false,
      data: 'lat=' + latitude + '&lng=' + longitude,
      dataType: "json",
      success: function(data) {
        let access = (data['results'][0]);
        let countryCode = access['countryCode'];
        let locationName = access['locationName'];
        let adminName = access['adminName'];
        bounds(countryCode);
        userLocationMarker(latitude, longitude, adminName);
        weatherCheck(latitude, longitude, locationName);
      }
    });
  }
}

function bounds(countryCode) {
  $.ajax({
    type: "POST",
    url: "api/countrybounds.php",
    cache: false,
    data: 'country=' + countryCode,
    dataType: "json",
    success: function(data) {
      let access = (data['results'][0])
      let south = access['geometry']['south'];
      let north = access['geometry']['north'];
      let east = access['geometry']['east'];
      let west = access['geometry']['west'];
      let countryName = access['countryName'];
      let continent = access['continentName'];
      let countryArea = access['area'];
      additionalCountryInfo(countryCode);
      basicCountryInfo(countryName, countryArea, continent);
      fitCountryBounds(south, north, east, west, countryName);
      getFlag(countryCode);
      getCountryShape(countryCode);//from leaflet.js
      wikiInfo(countryName);
    }
  });
}

////////////////////////Wiki info to review//////////////////////////////////////
function wikiInfo(countryName) {
  if(countryName === "Cabo Verde") {
    let newCountryName = "Cape Verde";
    getWikiInfo (newCountryName);
  } else if (countryName === "Czechia") {
    let newCountryName = "Czech Republic";
    getWikiInfo (newCountryName);
  } else if (countryName === "Congo Republic") {
    let newCountryName = "Republic of the Congo";
    getWikiInfo (newCountryName);
  } else if (countryName === "DR Congo") {
    let newCountryName = "Democratic Republic of the Congo";
    getWikiInfo (newCountryName);
  } else if (countryName === "French Southern Territories") {
    let newCountryName = "French Southern and Antarctic Lands";
    getWikiInfo (newCountryName);
  } else if (countryName === "Macao") {
    let newCountryName = "Macau";
    getWikiInfo (newCountryName);
  } else if (countryName === "North Macedonia") {
    let newCountryName = "Republic of Macedonia";
    getWikiInfo (newCountryName);
  } else if (countryName === "St Kitts and Nevis") {
    let newCountryName = "Saint Kitts and Nevis";
    getWikiInfo (newCountryName);
  } else if (countryName === "St Vincent and Grenadines") {
    let newCountryName = "Saint Vincent and the Grenadines";
    getWikiInfo (newCountryName);
  } else if (countryName === "Eswatini") {
    let newCountryName = "Swaziland";
    getWikiInfo (newCountryName);
  } else {
    getWikiInfo (countryName);
  }
}

function getWikiInfo (countryName) {
  console.log("To wiki :" + countryName);
  $.ajax({
    type: "POST",
    url: "api/countryWiki.php",
    cache: false,
    data: 'title=' + countryName,
    dataType: "json",
    success: function(data) {
      // console.log(data);
      let wikiLink = (data['results'][0]['link']);
      console.log(wikiLink);
      $("a").attr("href", "https://" + wikiLink);
      }
  });
}

//////////////////////////////////////////////////////////////

function basicCountryInfo(countryName, countryArea, continent) {
  $(".continent").html(continent);
  $(".country").html(countryName);
  $(".area").html((Math.round(countryArea)).toLocaleString());
}

function fitCountryBounds(south, north, east, west, countryName) {
  if (countryName !== "Western Sahara" && countryName !== "Palestine" && countryName !== "Antarctica") {
    $("#content").show();
    let southWest = L.latLng(south, west);
    let northEast = L.latLng(north, east);
    let bounds = L.latLngBounds(southWest, northEast);
    mymap.fitBounds(bounds);
  } else {
    // $("#content").hide();
    let southWest = L.latLng(south, west);
    let northEast = L.latLng(north, east);
    let bounds = L.latLngBounds(southWest, northEast);
    mymap.fitBounds(bounds);
  }
}

function additionalCountryInfo(countryCode) {
  $.ajax({
    type: "POST",
    url: "api/restcountry.php",
    cache: false,
    data: 'country=' + countryCode,
    dataType: "json",
    success: function(data) {
      let access = (data['results'][0]);
      let currencyName = (access['currencies']['name']);
      let currenciesCode = (access['currencies']['code']);
      let callingCode = (access['callingCodes']);
      let languages = (access['languages']);
      let population = (access['population']).toLocaleString();
      addAdditionalCountryInfo(currencyName, currenciesCode, callingCode, languages, population);
    }
  });
}

function addAdditionalCountryInfo(currencyName, currenciesCode, callingCode, languages, population) {
  $(".languages").html('');
  $(".population").html(population);
  $(".languages").append(languages);
  $(".callingCode").html(callingCode);
  $(".currencyName").html(currencyName);
  $(".currencyCode").html(currenciesCode);
}

function getFlag(countryCode) {
  let countryCodeLower = countryCode.toLowerCase();
  if (countryCodeLower == "gb") {
    countryCodeLower = 'uk';
    $(".flagImage").attr('src', "http://www.geonames.org/flags/m/" + countryCodeLower + ".png");
  } else {
    $(".flagImage").attr('src', "http://www.geonames.org/flags/m/" + countryCodeLower + ".png");
  }
}

function userLocationMarker(latitude, longitude, adminName) {
  let marker = L.marker([Number(latitude), Number(longitude)], {
    icon: userIcon
  }).addTo(mymap);
  marker.bindPopup("You are here in <span>" + adminName + "</span>!").openPopup();
}

//passing search value from search box
function formSubmit() {
  let countryName = $('#myInput').val();
  getCountryCode(countryName);
}

//searching country bounds based on user input
function getCountryCode(countryName) {
  if (countriesObj.hasOwnProperty(countryName)) {
    let countryCode = (countriesObj[countryName]);
    bounds(countryCode);
    $.ajax({
      type: "POST",
      url: "api/countrybounds.php",
      cache: false,
      data: 'country=' + countryCode,
      dataType: "json",
      success: function(data) {
        let access = (data['results'][0]);
        let countryName = access['countryName'];
        let capital = access['capital'];
        capitalInfo(capital, countryName);
      }
    });
  } else {
    return countryName;
  }
}

function capitalInfo(capital, country) {
  if (country !== "Western Sahara" && country !== "Palestine" && country !== "Antarctica") {
    $(".NoCapitalInfo").hide();
    $(".content").show();
    console.log("Capital info: " + capital);
      $.ajax({
        type: "POST",
        url: "./api/capitalSearch.php",
        cache: false,
        data: 'q=' + capital + "," + country,
        dataType: "json",
        success: function(data) {
          let capitalLatitude = Math.floor(data['results'][0]['capitalLat'] * 10000) / 10000;
          console.log(capitalLatitude);
          let capitalLongitude = Math.floor(data['results'][0]['capitalLng'] * 10000) / 10000;
          let newCapital = data['results'][0]['capital'];
          console.log(capitalLongitude);
          if(country == "Israel") {
            weatherCheck(capitalLatitude, capitalLongitude, newCapital, country);
            capitalMarker(capitalLatitude, capitalLongitude, newCapital, country);
          } else {
            weatherCheck(capitalLatitude, capitalLongitude, capital, country);
            capitalMarker(capitalLatitude, capitalLongitude, capital, country);
          }
        }
      });
  } else {
    $("#content").hide();
    $(".NoCapitalInfo").show();
    $(".NoCapitalInfo").html("No official capital found!");
  }
}

function capitalMarker(latitude, longitude, capital, country) {
  let popup = L.popup()
    .setLatLng([Number(latitude), Number(longitude)])
    .setContent("<span>" + capital + "</span>")
    .openOn(mymap);
}

//weather check
function weatherCheck(latitude, longitude, locationName, country) {
  console.log("weather check :" + locationName);
  console.log("weather check lat:" + latitude);
  console.log("weather check lng:" + longitude);
  console.log("weather check country:" + country);
  $.ajax({
    type: "POST",
    url: "api/weather.php",
    cache: false,
    data: 'lat=' + latitude + '&lon=' + longitude,
    dataType: "json",
    success: function(data) {
      let access = data['results'][0];
      let time = (access['today']['time']);
      let date = (access['today']['time']);
      let timeZoneOffset = (access['today']['timezone_offset']);
      time = (new Date(time*1000 + timeZoneOffset * 1000).toUTCString()).slice(17, 26);
      date = new Date (date*1000 + timeZoneOffset * 1000).toUTCString().slice(0, 16);
      let sunrise = (access['today']['sunrise']);
      let sunset = (access['today']['sunset']);
      if(sunrise == 0 && sunset == 0) {
        sunrise = "No info available";
        sunset = "No Info available";
      } else {
        sunrise = (new Date(sunrise*1000 + timeZoneOffset * 1000).toUTCString()).slice(17, 26);
        sunset = (new Date(sunset*1000 + timeZoneOffset * 1000).toUTCString()).slice(17, 26);
      }

        $(".latitude").html(latitude);
        $(".longitude").html(longitude);
        // $(".location").html(" ");
        $(".location").html(locationName);
        $(".localTime").html(time);
        $(".localDate").html(date);
        $(".sunrise").html(sunrise);
        $(".sunset").html(sunset);

      //weather today
      let conditionToday = (access['today']['condition'] );
      let temperatureToday = (access['today']['temp']);
      let humidityToday = (access['today']['humidity']);
      let windToday = (access['today']['wind_speed']);
      let pressureToday = (access['today']['pressure']);
      let iconURLToday = (access['today']['icon']);
      let imageURLToday = "http://openweathermap.org/img/wn/" + iconURLToday + "@2x.png";
      $("#weatherDescriptionHeaderToday").html(conditionToday);
      $("#temperatureToday").html(Math.floor(temperatureToday) + "&#176");
      $("#humidityToday").html("Humidity " + humidityToday + "%");
      $("#windSpeedToday").html("Wind " + Math.floor(windToday) + "m/s");
      $("#pressureToday").html("Pressure " + pressureToday + " hPa");
      $("#weatherImageToday").html("<img src=" + imageURLToday + ">");

      //weather tomorrow
      let conditionTomorrow = (access['tomorrow']['condition'] );
      let temperatureTomorrow = (access['tomorrow']['temp']);
      let humidityTomorrow = (access['tomorrow']['humidity']);
      let windTomorrow = (access['tomorrow']['wind_speed']);
      let pressureTomorrow = (access['tomorrow']['pressure']);
      let iconURLTomorrow = (access['tomorrow']['icon']);
      let imageURLTomorrow = "http://openweathermap.org/img/wn/" + iconURLTomorrow + "@2x.png";
      $("#weatherDescriptionHeaderDay1").html(conditionTomorrow);
      $("#temperatureDay1").html(Math.floor(temperatureTomorrow) + "&#176");
      $("#humidityDay1").html("Humidity " + humidityTomorrow + "%");
      $("#windSpeedDay1").html("Wind " + Math.floor(windTomorrow) + "m/s");
      $("#pressureDay1").html("Pressure " + pressureTomorrow + " hPa");
      $("#weatherImageDay1").html("<img src=" + imageURLTomorrow + ">");

      //weather after tomorrow
      let conditionAfterTomorrow = (access['after_tomorrow']['condition'] );
      let temperatureAfterTomorrow = (access['after_tomorrow']['temp']);
      let humidityAfterTomorrow = (access['after_tomorrow']['humidity']);
      let windAfterTomorrow = (access['after_tomorrow']['wind_speed']);
      let pressureAfterTomorrow = (access['after_tomorrow']['pressure']);
      let iconURLAfterTomorrow = (access['after_tomorrow']['icon']);
      let imageURLAfterTomorrow = "http://openweathermap.org/img/wn/" + iconURLAfterTomorrow + "@2x.png";
      $("#weatherDescriptionHeaderDay2").html(conditionAfterTomorrow);
      $("#temperatureDay2").html(Math.floor(temperatureAfterTomorrow) + "&#176");
      $("#humidityDay2").html("Humidity " + humidityAfterTomorrow + "%");
      $("#windSpeedDay2").html("Wind " + Math.floor(windAfterTomorrow) + "m/s");
      $("#pressureDay2").html("Pressure " + pressureAfterTomorrow + " hPa");
      $("#weatherImageDay2").html("<img src=" + imageURLAfterTomorrow + ">");

      $(".content").show();
    }
  });
}

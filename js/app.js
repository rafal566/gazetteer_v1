// jshint esversion:6
$(window).on('load', function() { // makes sure the whole site is loaded
  $('#preloader').fadeOut(); // will first fade out the loading animation
  $('#preloaderContainer').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(500).css({
    'overflow': 'visible'
  });
});

$(window).on('load', function() {
  $("#content").hide();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findUserPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
    mymap = L.map('map').setView([0, 0], 2);
    }
});


//finding user's position
function findUserPosition(position) {
  $("#content").show();
  $(".NoCapitalInfo").hide();
  if (position.coords.latitude && position.coords.longitude) {
    let latitude = Math.floor(position.coords.latitude * 10000) / 10000;
    let longitude = Math.floor(position.coords.longitude * 10000) / 10000;
    $.ajax({
      type: "POST",
      url: "api/userLocation.php",
      cache: false,
      data: 'lat=' + latitude + '&lng=' + longitude,
      dataType: "json",
      success: function(data) {
        data = JSON.parse(data);
        let access = (data['geonames'][0]);
        let countryCode = access['countryCode'];
        let locationName = access['name'];
        let adminName = access['adminName1'];
        bounds(countryCode);
        userLocationMarker(latitude, longitude, adminName);
        weatherCheck(latitude, longitude, locationName);
        $(".content").show();
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
      data = JSON.parse(data);
      let access = (data['geonames'][0]);
      let south = access['south'];
      let north = access['north'];
      let east = access['east'];
      let west = access['west'];
      let countryName = access['countryName'];
      let continent = access['continentName'];
      let countryArea = access['areaInSqKm'];
      additionalCountryInfo(countryCode);
      basicCountryInfo(countryName, countryArea, continent);
      fitCountryBounds(south, north, east, west, countryName);
      getFlag(countryCode);
    }
  });
}

function basicCountryInfo(countryName, countryArea, continent) {
  $(".continent").html(continent);
  $(".country").html(countryName);
  $(".area").html(Math.round(countryArea));
}

function fitCountryBounds(south, north, east, west, countryName) {
  if (countryName == "Fiji" || countryName == "New Zealand" || countryName == "Kiribati") {
    let southWest = L.latLng(south, west);
    let northEast = L.latLng(north, east+360);
    let bounds = L.latLngBounds(southWest, northEast);
    mymap.fitBounds(bounds);
  } else {
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
      data = JSON.parse(data);
      let currencyName = (data['currencies'][0]['name']);
      let currenciesCode = (data['currencies'][0]['code']);
      let currenciesSymbol = (data['currencies'][0]['symbol']);
      let callingCode = (data['callingCodes']);
      let languages = (data['languages']);
      let population = (data['population']);
      $(".languages").html('');
      $(".callingCode").html(callingCode);
      $(".population").html(population);
      $(".currencyName").html(currencyName);
      $(".currencyCode").html(currenciesCode);
      $(".currencySymbol").html(currenciesSymbol);
      let lang = [];
      for (let i = 0; i <= languages.length - 1; i++) {
        lang.push(data['languages'][i]['name']);
      }
      let countryLanguages = lang.join(", ");
      $(".languages").append(countryLanguages);
    }
  });
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
let mySearchForm = $('#mySearchForm');
mySearchForm.submit(function(e) {
  $("#content").show();
  e.preventDefault();
  let countryName = $("#myInput").val();
  getCountryCode(countryName);
});

//searching country bounds based on user input
function getCountryCode(countryName) {
  console.log("Search country name " + countryName);
  if (countriesObj.hasOwnProperty(countryName)) {
    let countryCode = (countriesObj[countryName]);
    additionalCountryInfo(countryCode);
    bounds(countryCode);
    $.ajax({
      type: "POST",
      url: "api/countrybounds.php",
      cache: false,
      data: 'country=' + countryCode,
      dataType: "json",
      success: function(data) {
        data = JSON.parse(data);
        let access = (data['geonames'][0]);
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
  $("#capitalInfo").show();
  $("#weatherInfo").show();
  $(".NoCapitalInfo").hide();
  if (country !== "Brazil" && country !== "Bermuda" && country !== "Cayman Islands" && country !== "Chile" &&
    country !== "Dominica" && country !== "Grenada" && country !== "Isle of Man" && country !== "Israel" &&
    country !== "Jersey" && country !== "Kiribati"  && country !== "Maldives" && country !== "Norfolk Island" &&
    country !== "Réunion" && country !=="Northern Mariana Islands" && country !== "Saint Helena" && country !== "Seychelles" &&
    country !== "Timor-Leste" && country !== "Saint Pierre and Miquelon" &&  country !== "Tunisia" && country !== "Western Sahara" &&
    country !== "Palestine") {
    $.ajax({
      type: "POST",
      url: "./api/capitalSearch.php",
      cache: false,
      data: 'q=' + capital,
      country,
      dataType: "json",
      success: function(data) {
        data = JSON.parse(data);
        // console.log(data);
        let capitalLatitude = Math.floor(data['results'][0]['geometry']['lat'] * 10000) / 10000;
        console.log("Capital lat: " + capitalLatitude);
        let capitalLongitude = Math.floor(data['results'][0]['geometry']['lng'] * 10000) / 10000;
        console.log("Capital lng: " + capitalLongitude);
        weatherCheck(capitalLatitude, capitalLongitude, capital, country);
        capitalMarker(capitalLatitude, capitalLongitude, capital, country);
      }
    });
  } else if (country === "Brazil") {
    let brCapitalLatitude = -15.8267;
    let brCapitalLongitude = -47.9218;
    weatherCheck(brCapitalLatitude, brCapitalLongitude, capital, country);
    capitalMarker(brCapitalLatitude, brCapitalLongitude, capital, country);

  } else if (country === "Bermuda") {
    let bmCapitalLatitude = 32.2946;
    let bmCapitalLongitude = -64.7859;
    weatherCheck(bmCapitalLatitude, bmCapitalLongitude, capital, country);
    capitalMarker(bmCapitalLatitude, bmCapitalLongitude, capital, country);

  } else if (country === "Cayman Islands") {
    let bmCapitalLatitude = 19.2869;
    let bmCapitalLongitude = -81.3674;
    weatherCheck(bmCapitalLatitude, bmCapitalLongitude, capital, country);
    capitalMarker(bmCapitalLatitude, bmCapitalLongitude, capital, country);

  } else if (country === "Chile") {
    let clCapitalLatitude = -33.4489;
    let clCapitalLongitude = -70.6693;
    weatherCheck(clCapitalLatitude, clCapitalLongitude, capital, country);
    capitalMarker(clCapitalLatitude, clCapitalLongitude, capital, country);

  } else if (country === "Dominica") {
    let dmCapitalLatitude = 15.3092;
    let dmCapitalLongitude = -61.3794;
    weatherCheck(dmCapitalLatitude, dmCapitalLongitude, capital, country);
    capitalMarker(dmCapitalLatitude, dmCapitalLongitude, capital, country);

  } else if (country === "Grenada") {
    let gdCapitalLatitude = 12.0561;
    let gdCapitalLongitude = -61.7488;
    weatherCheck(gdCapitalLatitude, gdCapitalLongitude, capital, country);
    capitalMarker(gdCapitalLatitude, gdCapitalLongitude, capital, country);

  } else if (country === "Isle of Man") {
    let imCapitalLatitude = 54.1523;
    let imCapitalLongitude = -4.4861;
    weatherCheck(imCapitalLatitude, imCapitalLongitude, capital, country);
    capitalMarker(imCapitalLatitude, imCapitalLongitude, capital, country);

  } else if (country === "Israel") {
    let capital = "Jerusalem";
    let ilCapitalLatitude = 31.7683;
    let ilCapitalLongitude = 35.2137;
    weatherCheck(ilCapitalLatitude, ilCapitalLongitude, capital, country);
    capitalMarker(ilCapitalLatitude, ilCapitalLongitude, capital, country);

  } else if (country === "Jersey") {
    let jeCapitalLatitude = 49.1805;
    let jeCapitalLongitude = -2.1032;
    weatherCheck(jeCapitalLatitude, jeCapitalLongitude, capital, country);
    capitalMarker(jeCapitalLatitude, jeCapitalLongitude, capital, country);

  } else if (country === "Kiribati") {
    let kiCapitalLatitude = 1.4518;
    let kiCapitalLongitude = 172.9717;
    weatherCheck(kiCapitalLatitude, kiCapitalLongitude, capital, country);
    capitalMarker(kiCapitalLatitude, kiCapitalLongitude, capital, country);

  } else if (country === "Maldives") {
    let capital = "Male";
    let mvCapitalLatitude = 4.1755;
    let mvCapitalLongitude = 73.5093;
    weatherCheck(mvCapitalLatitude, mvCapitalLongitude, capital, country);
    capitalMarker(mvCapitalLatitude, mvCapitalLongitude, capital, country);

  } else if (country === "Norfolk Island") {
    let nfCapitalLatitude = -29.0564;
    let nfCapitalLongitude = 167.9596;
    weatherCheck(nfCapitalLatitude, nfCapitalLongitude, capital, country);
    capitalMarker(nfCapitalLatitude, nfCapitalLongitude, capital, country);

  } else if (country === "Northern Mariana Islands") {
    let mpCapitalLatitude = 15.1850;
    let mpCapitalLongitude = 145.7467;
    weatherCheck(mpCapitalLatitude, mpCapitalLongitude, capital, country);
    capitalMarker(mpCapitalLatitude, mpCapitalLongitude, capital, country);

  } else if (country === "Réunion") {
    let reCapitalLatitude = -20.8907;
    let reCapitalLongitude = 55.4551;
    weatherCheck(reCapitalLatitude, reCapitalLongitude, capital, country);
    capitalMarker(reCapitalLatitude, reCapitalLongitude, capital, country);

  } else if (country === "Seychelles") {
    let capital = "Victoria";
    let scCapitalLatitude = -4.63;
    let scCapitalLongitude = 55.45;
    weatherCheck(scCapitalLatitude, scCapitalLongitude, capital, country);
    capitalMarker(scCapitalLatitude, scCapitalLongitude, capital, country);

} else if (country === "Saint Helena") {
  let capital = "Jamestown";
  let shCapitalLatitude = -15.9286;
  let shCapitalLongitude = -5.7152;
  weatherCheck(shCapitalLatitude, shCapitalLongitude, capital, country);
  capitalMarker(shCapitalLatitude, shCapitalLongitude, capital, country);

} else if (country === "Timor-Leste") {
  let tlCapitalLatitude = -8.5569;
  let tlCapitalLongitude = 125.5603;
  weatherCheck(tlCapitalLatitude, tlCapitalLongitude, capital, country);
  capitalMarker(tlCapitalLatitude, tlCapitalLongitude, capital, country);

} else if (country === "Saint Pierre and Miquelon") {
  let pmCapitalLatitude = 46.7758;
  let pmCapitalLongitude = -56.1806;
  weatherCheck(pmCapitalLatitude, pmCapitalLongitude, capital, country);
  capitalMarker(pmCapitalLatitude, pmCapitalLongitude, capital, country);

} else if (country === "Tunisia") {
  let tnCapitalLatitude = 36.8065;
  let tnCapitalLongitude = 10.1815;
  weatherCheck(tnCapitalLatitude, tnCapitalLongitude, capital, country);
  capitalMarker(tnCapitalLatitude, tnCapitalLongitude, capital, country);
}

else {
    $(".location").html(country);
    $(".currency").html("No info available");
    $(".latitude").html("No info available");
    $(".longitude").html("No info available");
    $(".sunrise").html("No info available");
    $(".sunset").html("No info available");
    $(".localTime").html("No info available");
    $(".localDate").html("No info available");
    $(".NoCapitalInfo").html("No official capital found!");
    $(".NoCapitalInfo").show();
    $("#capitalInfo").hide();
    $("#weatherInfo").hide();
  }
}

function capitalMarker(latitude, longitude, capital, country) {
  let popup = L.popup()
    .setLatLng([Number(latitude), Number(longitude)])
    .setContent("<span>" + capital + "</span>")
    .openOn(mymap);
}

//weather check
function weatherCheck(latitude, longitude, locationName) {
  $.ajax({
    type: "POST",
    url: "api/weather.php",
    cache: false,
    data: 'lat=' + latitude + '&lon=' + longitude,
    dataType: "json",
    success: function(data) {
      data = JSON.parse(data);
      let time = (data['current']['dt']);
      let timeZoneOffset = (data['timezone_offset']);
      let localTimeString = new Date(time * 1000 + timeZoneOffset * 1000 - 3600 * 1000).toLocaleTimeString('en-US');
      let localDateString = new Date(time * 1000 + timeZoneOffset * 1000 - 3600 * 1000).toLocaleDateString('en-US');
      let sunrise = (data['current']['sunrise']);
      let sunset = (data['current']['sunset']);
      let sunriseTime = new Date(sunrise * 1000 + timeZoneOffset * 1000 - 3600 * 1000).toLocaleTimeString('en-US');
      let sunsetTime = new Date(sunset * 1000 + timeZoneOffset * 1000 - 3600 * 1000).toLocaleTimeString('en-US');
      let temperature = (data['current']['temp']);
      let condition = (data['current']['weather'][0]['main']);
      let wind = (data['current']['wind_speed']);
      let pressure = (data['current']['pressure']);
      let humidity = (data['current']['humidity']);
      let icon = (data['current']['weather'][0]['icon']);
      let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      $(".latitude").html(latitude);
      $(".longitude").html(longitude);
      $(".location").html(locationName);
      $(".localTime").html(localTimeString);
      $(".localDate").html(localDateString);
      $(".sunrise").html(sunriseTime);
      $(".sunset").html(sunsetTime);

      //current user's weather
      $("#weatherDescriptionHeaderToday").html(condition);
      $("#temperatureToday").html(Math.floor(temperature) + "&#176");
      $("#humidityToday").html("Humidity " + humidity + "%");
      $("#windSpeedToday").html("Wind " + Math.floor(wind) + "m/s");
      $("#pressureToday").html("Pressure " + pressure + " hPa");
      $("#weatherImageToday").html("<img src=" + imageURL + ">");

      //forecasts for 2 days
      let dailyWeather = data.daily;
      $("#weatherDescriptionHeaderDay1").html(dailyWeather[1]['weather'][0]['main']);
      $("#temperatureDay1").html(Math.floor(dailyWeather[1]['temp']['day']) + "&#176");
      $("#humidityDay1").html("Humidity " + dailyWeather[1]['humidity'] + "%");
      $("#windSpeedDay1").html("Wind " + Math.floor(dailyWeather[1]['wind_speed']) + "m/s");
      $("#pressureDay1").html("Pressure " + dailyWeather[1]['pressure'] + " hPa");
      $("#weatherImageDay1").html("<img src=" + "http://openweathermap.org/img/wn/" + dailyWeather[1]['weather'][0]['icon'] + "@2x.png" + ">");

      $("#weatherDescriptionHeaderDay2").html(dailyWeather[2]['weather'][0]['main']);
      $("#temperatureDay2").html(Math.floor(dailyWeather[2]['temp']['day']) + "&#176");
      $("#humidityDay2").html("Humidity " + dailyWeather[2]['humidity'] + "%");
      $("#windSpeedDay2").html("Wind " + Math.floor(dailyWeather[2]['wind_speed']) + "m/s");
      $("#pressureDay2").html("Pressure " + dailyWeather[2]['pressure'] + " hPa");
      $("#weatherImageDay2").html("<img src=" + "http://openweathermap.org/img/wn/" + dailyWeather[2]['weather'][0]['icon'] + "@2x.png" + ">");
      $(".content").show();
    }
  });
}


////////////////////Autocomplete///////////////////////
const countries = Object.keys(countriesObj);

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    let a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus letiable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus letiable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}
autocomplete(document.getElementById("myInput"), countries);

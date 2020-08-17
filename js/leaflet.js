//jshint esversion:6

//Tails
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoicmFmYWw1NjYiLCJhIjoiY2tkMnZ4YmJoMDB0bzJ5cW14MG9sdHNmciJ9.8yadfFy8Zt4HqcZh6-Ds8A',
  // pane: "pane"
});

let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
});

let cicleMap = L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=ede7d0eb172c4d45946a59e4880395e6', {
  attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
});

let mymap = L.map('map', {
  layers: [cicleMap, topoMap, streets],
  center: [0, 0],
  zoomControl: true,
  minZoom: 1,
  maxZoom: 20,
  bounceAtZoomLimits: false,
}).fitWorld();


//customized icon
let userIcon = L.icon({
  iconUrl: './styles/icons/user-marker.png',
  iconSize: [38, 40], // size of the icon
  iconAnchor: [19, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
});

let locationIcon = L.icon({
  iconUrl: './styles/icons/map-marker.png',
  iconSize: [38, 40],
  iconAnchor: [19, 40],
  popupAnchor: [0, -40]
});


//geoJSON
let geojson;
let geojsonLayer = L.geoJson().addTo(mymap);

let style = {
  // fillColor: "#ebecf1",
  weight: 2,
  opacity: 0.3,
  color: '#b52b65',
  fillOpacity: 0,
};


function getCountryShape(countryCode) {
  for (let i = 0; i <= ((geoObject.features).length - 1); i++) {
    if (geoObject.features[i].properties.ISO2 == countryCode) {
      // console.log(geoObject.features[i].properties.ISO2);
      // console.log(geoObject.features[i])
      mymap.removeLayer(geojsonLayer);
      geojsonLayer = L.geoJson(geoObject.features[i], {
        style: style
      }).addTo(mymap);
      geojsonLayer.addData(geoObject.features[i]);
    }
  }
}


//measurements
let measureControl = L.control.polylineMeasure({
  position: 'topleft', // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
  unit: 'metres', // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
  clearMeasurementsOnStop: false, // Clear all the measurements when the control is unselected
  showBearings: false,
  showClearControl: true,
  unitControlTitle: { // Title texts to show on the Unit Control button
    text: 'Change Units',
    metres: 'metres',
    landmiles: 'land miles',
    nauticalmiles: 'nautical miles'
  },
  unitControlLabel: { // Unit symbols to show in the Unit Control button and measurement labels
    metres: 'm',
    kilometres: 'km',
    feet: 'ft',
    landmiles: 'mi',
    nauticalmiles: 'nm',
  },
  tempLine: { // Styling settings for the temporary dashed line
    color: '#00f', // Dashed line color
    weight: 2 // Dashed line weight
  },
  fixedLine: { // Styling for the solid line
    color: '#006', // Solid line color
    weight: 2 // Solid line weight
  },
  startCircle: { // Style settings for circle marker indicating the starting point of the polyline
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#0f0', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
  intermedCircle: { // Style settings for all circle markers between startCircle and endCircle
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#ff0', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
  currentCircle: { // Style settings for circle marker indicating the latest point of the polyline during drawing a line
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#f0f', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
  endCircle: { // Style settings for circle marker indicating the last point of the polyline
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#f00', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
}).addTo(mymap);


//draw map
let drawnItems = new L.FeatureGroup();
mymap.addLayer(drawnItems);
let drawControl = new L.Control.Draw({
  position: 'topright',
  draw: {
    polygon: {
      shapeOptions: {
        color: 'purple',
      },
      allowIntersection: false,
      drawError: {
        color: 'red',
        timeout: 1000
      },
      showAre: true,
    },
    polyline: {
      zIndexOffset: 999,
      shapeOptions: {
        color: 'red',
      },
    },
    rectangle: {
      shapeOptions: {
        color: 'green'
      },
    },
    circle: {
      shapeOptions: {
        color: 'steelblue',
      },
    },
    marker: {
      icon: locationIcon,
      edit: false,
    },
  },
  edit: {
    featureGroup: drawnItems,
    edit: false,
  }
});
mymap.addControl(drawControl);

mymap.on('draw:created', function(e) {
  let type = e.layerType,
    layer = e.layer;
  if (type === 'circle') {
    let area = 0;
    let radius = e.layer.getRadius();
    area = (Math.PI) * (radius * radius);
    let circle = L.circle();
    let theCenterPt = layer.getLatLng();
    let center = [theCenterPt.lng, theCenterPt.lat];
    let theRadius = layer.getRadius().toString();
    layer.bindPopup("Area: " + Math.round(area / 1000000) + " km<sup>2</sup></br> Radius: " + Math.round(theRadius / 1000) + " km").openPopup();
  }

  if (type === 'rectangle' || type === 'polygon') {
    let area = new L.featureGroup();
    area.addLayer(layer);
    let showArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    console.log(showArea);
    layer.bindPopup('Area:' + Math.round(showArea / 1000000) + " km<sup>2").openPopup();
  }

  if (type === 'polyline') {
    let distance = new L.featureGroup();
    // distance.addLayer(layer);
    // let bounds = layer.getBounds();
    // console.log(layer._latlngs);
  }

  drawnItems.addLayer(layer);

  if (type === 'marker') {
    let marker = new L.featureGroup();
    marker.addLayer(layer);
    let markerLatLng = (layer.getLatLng());
    let latitude = markerLatLng.lat;
    let longitude = markerLatLng.lng;
    layer.bindPopup('Latitude:' + Math.floor(latitude * 1000) / 1000 + "</br> Longitude: " + Math.floor(longitude * 10000) / 10000).openPopup();
  }
});

//Layers control
let baseMaps = {
  "Cicle": cicleMap,
  "topo": topoMap,
  "Streets": streets,
};

let overlayMaps = {
  "hide draw": drawnItems,
};

L.control.layers(baseMaps, overlayMaps, {
  position: 'topleft',
}).addTo(mymap);

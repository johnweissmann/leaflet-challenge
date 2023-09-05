// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Create our map.
  let myMap = L.map("map", {
    center: [
      37.09, -115.71
    ],
    zoom: 5,
  });
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <p>Magnitude: ${feature.properties.mag}</p><hr>
      <p>Depth: ${feature.geometry.coordinates[2]} km</p>
      `);
    }
  }).addTo(myMap);

});

function getColor(feature) {
  if (feature > 20) {
    return "green";
  }
  else if (feature > 15) {
    return "yellow";
  }
  else if (feature > 10) {
    return "orange";
  }
  else {
    return "red";
  }
} 

function getRadius(feature) {  
  return Math.sqrt(feature) * 5
}

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}
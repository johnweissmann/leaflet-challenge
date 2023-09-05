.circle(feature.properties.place, {
    fillOpacity: 0.75,
    fillColor: "white",
    // Adjust the radius.
    radius: Math.sqrt(feature.properties.mag) * 500
  })
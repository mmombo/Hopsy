breweryGeo = JSON.parse(breweryGeo);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
  center: breweryGeo.coordinates, // starting position [lng, lat]
  zoom: 13, // starting zoom
});
//prettier-ignore
const marker = new mapboxgl.Marker()
    .setLngLat(breweryGeo.coordinates)
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());

brewery = JSON.parse(brewery);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
  center: brewery.geometry.coordinates, // starting position [lng, lat]
  zoom: 13, // starting zoom
});
//prettier-ignore
const marker = new mapboxgl.Marker()
    .setLngLat(brewery.geometry.coordinates)
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());

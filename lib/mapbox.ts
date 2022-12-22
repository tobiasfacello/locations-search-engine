import { state } from "../client/state";
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true,
});

function successLocation(position) {
	setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
	setupMap([-73.990593, 40.740121]);
}

function setupMap(center) {
	mapboxgl.accessToken =
		"pk.eyJ1IjoidG9iaWFzZmFjZWxsbyIsImEiOiJjbGFvdWY0aTEwZHd5M29zMGszemMyaG9zIn0.uTgMn_g1fHu0juGKyfa9FQ";
	const map: mapboxgl.Map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v12",
		center: center,
		zoom: 15,
	});

	const nav: mapboxgl.NavigationControl = new mapboxgl.NavigationControl();
	const geocoder: MapboxGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
	});
	const containerEl: HTMLDivElement = document.querySelector(".geocoder");

	map.addControl(nav);
	containerEl.appendChild(geocoder.onAdd(map));

	const geocoderInputEl: HTMLInputElement = document.querySelector(
		".mapboxgl-ctrl-geocoder--input"
	);

	geocoderInputEl.addEventListener("keypress", async (e) => {
		if (e.key === "Enter") {
			console.log(e.target);
			const params = { lat: -32.68786, lng: -58.88633 };
			await createNewMarker(params, map);
		}
	});
}

async function createNewMarker(
	params: { lat: number; lng: number },
	map: mapboxgl.Map
) {
	const getNearCommerces = await state.getNearestCommerce(params);
	const RequestResponse = getNearCommerces.response;

	RequestResponse.then((data) => {
		const nearestCommerces = data.hits;
		console.log(nearestCommerces);

		for (const commerce of nearestCommerces) {
			const marker: mapboxgl.Marker = new mapboxgl.Marker()
				.setLngLat([commerce._geoloc.lng, commerce._geoloc.lat])
				.addTo(map);
		}
	});
}

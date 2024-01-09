"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyBZXm96mSc2xuH18JbVx7K_nP9oYiwMy1Y";

export default function Map() {
  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    const mapOptions = {
      center: { lat: 25.032498999999998, lng: 121.56260650000002 },
      zoom: 16,
    };

    const fields = [
      "name",
      "formatted_address",
      "formatted_phone_number",
      "place_id",
      "geometry",
      "rating",
    ];

    loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions,
        );
        const input = document.getElementById("pac-input");
        // Specify just the place data fields that you need.
        const autocomplete = new google.maps.places.Autocomplete(input, {
          fields,
        });

        autocomplete.bindTo("bounds", map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        return map;
      })
      .catch(() => {
        // do something
      });
  }, []);

  return <div className="w-[600px] h-[300px]" id="map" />;
}

import React, { useEffect } from "react";
import InteractiveMap, { Marker, NavigationControl} from "react-map-gl";
import { SiGooglemaps } from "react-icons/si";
import { useState } from "react";

const TOKEN = "pk.eyJ1Ijoiam9zZW1hY3J1eiIsImEiOiJja3V0enBwdG0xbTI5MnZwNXI4cnR6dnJlIn0.tq9DWm_TpUW-rSr_ozHNsg";
const navStyle = {
  position: "absolute",
  padding: "1rem"
};

function MapWithMarkers({setPosition}) {
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37.410940576962865,
    longitude: -6.00082257667172,
    zoom: 14.5,
    pitch: 40,
    bearing: 0
  });

  const handleClick = ({ lngLat: [longitude, latitude] }) =>
  setMarkers([{ longitude, latitude }]);

  const handleChange = (viewport) => {
    setViewport(viewport);
  }
  
  useEffect(() => {
    if (markers.length) {
      setPosition(markers[0]);
    }
  }, [markers])
  
  return (
		<InteractiveMap
      onClick={handleClick}
      width="30rem"
      height="20rem"
      mapboxApiAccessToken={TOKEN}
      onViewportChange={handleChange}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      {...viewport}
    >
          <NavigationControl
            onViewportChange={handleChange}
            style={navStyle}
          />
          {markers.length ? markers.map((m, i) => (
            <Marker {...m} key={i}>
              <SiGooglemaps />
            </Marker>
          ))
        	: null}
        </InteractiveMap> 
  );
}

export default MapWithMarkers;

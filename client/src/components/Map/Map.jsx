// Third party modules
import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});

const MapModal = ({ long, lat}) => {

  // State management module
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long);

	useEffect(() => {
		setLatitude(lat);
		setLongitude(long);
	}, [long, lat]);

  return (
		<Map
			style="mapbox://styles/mapbox/streets-v8"
			zoom={[10]}
			center={[latitude, longitude]}
			containerStyle={{
				height: "50vh",
				width: "50vw"
			}}
		>
			<Layer
			        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15" }}
			>
				<Feature coordinates={[latitude, longitude]} />
			</Layer>
		</Map>
  );
};

export default MapModal;

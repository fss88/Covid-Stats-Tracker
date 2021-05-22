import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { showStateDataOnMap } from './utilis';
import './Map.css'

function Map2({state,casesType}) {
    return (
        <div className="map">
            <LeafletMap center={{lat: 37, lng: -97.9999 }} zoom={4}>
                {/* <ChangeView center={center} zoom={zoom} /> */}
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* draw circles */}

                {showStateDataOnMap(state, casesType)}

            </LeafletMap>
        </div>
    )
}

export default Map2

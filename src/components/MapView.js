import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import EventMarker from './EventMarker'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import MyLocationIcon from './MyLocationIcon'


const MapView = ({ currentLocation, events, range }) => {
  const [zoom, setZoom] = React.useState(12)

  return (
    <Map center={currentLocation} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker
        key={1}
        position={[
          currentLocation.lat,
          currentLocation.lng
        ]}
        icon={MyLocationIcon()}
      />
      <MarkerClusterGroup>
        {events.map((event, i) => 
          <EventMarker event={event} key={i} currentLocation={currentLocation} />
        )}
      </MarkerClusterGroup>
      <Circle center={[currentLocation.lat, currentLocation.lng]} radius={range * 1000} />
    </Map>
  )
}

export default MapView

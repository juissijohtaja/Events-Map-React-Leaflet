import React, { useState, useEffect } from 'react'
import L, { divIcon } from 'leaflet'
import { Map, TileLayer, Marker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import { renderToStaticMarkup } from "react-dom/server"

import FontAwesome from 'react-fontawesome'
import EventMarker from './EventMarker'
import MarkerClusterGroup from "react-leaflet-markercluster"


const MapView = ({ currentLocation, events, range }) => {
  const [zoom, setZoom] = React.useState(12)

  const iconMarkup = renderToStaticMarkup(
    <FontAwesome
      name="map-marker"
      size="3x"
      style={{ textShadow: '3px -1px 6px rgba(0,0,0,0.7)', color: 'rgb(153,85,223)' }}
    />
  )
  const customMarkerIcon = divIcon({
    html: iconMarkup
  })

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
        icon={customMarkerIcon}
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

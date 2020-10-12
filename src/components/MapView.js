import React, { useState, useEffect } from 'react'
import L, { divIcon } from 'leaflet'
import { Map, TileLayer, Marker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import { renderToStaticMarkup } from "react-dom/server"

import FontAwesome from 'react-fontawesome'
import EventMarker from './EventMarker'
import MarkerClusterGroup from "react-leaflet-markercluster"


const MapView = (props) => {
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
    <Map center={props.currentLocation} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker
        key={1}
        position={[
          props.currentLocation.lat,
          props.currentLocation.lng
        ]}
        icon={customMarkerIcon}
      />
      <MarkerClusterGroup>
        {props.events.map((event, i) => 
          <EventMarker event={event} key={i} currentLocation={props.currentLocation} />
        )}
      </MarkerClusterGroup>
      <Circle center={[props.currentLocation.lat, props.currentLocation.lng]} radius={props.range * 1000} />
    </Map>
  )
}

export default MapView

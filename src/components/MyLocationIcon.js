import React from 'react'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from "react-dom/server"
import FontAwesome from 'react-fontawesome'

const MyLocationIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <FontAwesome
      name="map-marker"
      size="3x"
      style={{ textShadow: '3px -1px 6px rgba(0,0,0,0.1)', color: 'rgb(153,85,223)' }}
    />
  )
  const customMarkerIcon = divIcon({
    html: iconMarkup
  })
  return customMarkerIcon
}

export default MyLocationIcon
import React, { Fragment } from 'react'
import L, { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { renderToStaticMarkup } from "react-dom/server"
import FontAwesome from 'react-fontawesome'

const EventMarker = (props) => {

  const iconMarkup = renderToStaticMarkup(
    <FontAwesome
      name="map-marker"
      size="3x"
      style={{ textShadow: '3px -1px 6px rgba(0,0,0,0.1)', color: 'rgb(55,169,255)' }}
    />
  )
  const customMarkerIcon = divIcon({
    html: iconMarkup
  })

  const distanceToMyLocation = props.event.distance

  return (
    <Marker position={[props.event.location.lat, props.event.location.lon]} icon={customMarkerIcon} >
      <Popup>
        <h4>{props.event.name.fi}</h4>
        <p>{props.event.description.intro}</p>
        {distanceToMyLocation < 1000 ? 
          <p>Etäisyys: {distanceToMyLocation.toFixed(0)} m</p>
          : <p>Etäisyys: {(distanceToMyLocation/1000).toFixed(1)} km</p>
        }
                
      </Popup>
    </Marker>
  )
}

export default EventMarker

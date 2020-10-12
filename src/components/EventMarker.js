import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import EventIcon from './EventIcon'

const EventMarker = ({ event }) => {

  return (
    <Marker position={[event.location.lat, event.location.lon]} icon={EventIcon()} >
      <Popup>
        <h4>{event.name.fi}</h4>
        <p>{event.description.intro}</p>
        {event.distance < 1000 ? 
          <p>Etäisyys: {event.distance.toFixed(0)} m</p>
          : <p>Etäisyys: {(event.distance/1000).toFixed(1)} km</p>
        }    
      </Popup>
    </Marker>
  )
}

export default EventMarker

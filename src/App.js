import React, { useState, useEffect } from 'react'
import MapView from './components/MapView'
import EventsView from './components/EventsView'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner } from 'react-bootstrap'
import L from 'leaflet'


const App = () => {
  const [currentLocation, setCurrentLocation] = React.useState({ lat: null, lng: null  })
  const [events, setEvents] = React.useState([])
  const [range, setRange] = React.useState(2)
  const [loading, setLoading] = React.useState(true)
  const limit = 1000

  /* useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('my position', position.coords)
        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
      })
    }
  }, []) */

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('my position', position.coords)
        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        
        axios
          .get(`https://cors-anywhere.herokuapp.com/http://open-api.myhelsinki.fi/v1/events/?limit=${limit}&distance_filter=${position.coords.latitude}%2C${position.coords.longitude}%2C${range}`)
          .then(response => {
            console.log('response', response.data.data)
            setEvents(response.data.data.map(event => {
              const myPosition = L.latLng(position.coords.latitude, position.coords.longitude)
              const eventPosition = L.latLng(event.location.lat, event.location.lon)
              const distanceToEvent = myPosition.distanceTo(eventPosition)
              return { ...event, distance: distanceToEvent }
            }))
            setLoading(false)
          })
      })
    }
  }, [range])
  
  return (
    <Container className='pt-4 bg-light'>
      <div className="App">
        <h1>Event map</h1>
        <div>
          {currentLocation.lat && currentLocation.lng && events.length > 0
            ? <div>
              <MapView currentLocation={currentLocation} events={events} range={range} />
              <EventsView events={events} />
            </div>
            : 
            <Spinner animation="border" role="status">
              <span className="sr-only">Getting your position and loading events...</span>
            </Spinner>
          }
        </div>
      </div>
    </Container>
  )
}

export default App

import React, { useEffect } from 'react'
import MapView from './components/MapView'
import EventsView from './components/EventsView'
import NavbarMain from './components/NavbarMain'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner, Form, Badge } from 'react-bootstrap'
import L from 'leaflet'

const App = () => {
  const [currentLocation, setCurrentLocation] = React.useState({ lat: null, lng: null  })
  const [events, setEvents] = React.useState([])
  const [range, setRange] = React.useState(2)
  const [loading, setLoading] = React.useState(true)
  const limit = 1000

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

  const handleRangeSliderChange = (event) => {
    console.log('slider', event.target.value)
    setLoading(true)
    setRange(event.target.value)
  }
  
  return (
    
    <div className="App">
      <NavbarMain />
      <div>
        <Container className='pt-3 bg-light'>
          {!loading && currentLocation.lat && currentLocation.lng && events.length > 0
            ? <div>
              <p>Löysimme {events.length} tapahtumaa {range} km:n säteellä tämän hetkisestä sijainnistasi.</p>
              <Form>
                <Form.Group id="formBasicRange">
                  <Form.Label>
                    <Badge pill variant="info">
                      Lon: {(currentLocation.lng).toFixed(2)}
                    </Badge>{' '}
                    <Badge pill variant="info">
                      Lat: {(currentLocation.lat).toFixed(2)}
                    </Badge>{' '}
                    <Badge pill variant="info">
                      Säde: {range}
                    </Badge>
                  </Form.Label>
                  <Form.Control type="range" id="Range" min="1" max="10" step="1" onChange={handleRangeSliderChange} value={range} />
                </Form.Group>
              </Form>
              <MapView currentLocation={currentLocation} events={events} range={range} />
              <EventsView events={events} />
            </div>
            : 
            <Container className='d-flex justify-content-center py-5'>
              <Spinner animation="border" role="status">
                <span className="sr-only">Getting your position and loading events...</span>
              </Spinner>
            </Container>
          }
        </Container>
      </div>
    </div>
  )
}

export default App

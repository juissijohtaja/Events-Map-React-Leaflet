import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import Moment from 'react-moment'

const EventsView = ({ events }) => {
  console.log('EventsView', events)
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tapahtuma</th>
          <th>Aika</th>
          <th>Osoite</th>
          <th>Etäisyys</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, i) => 
          <tr key={i}>
            <td>{event.name.fi}</td>
            <td><Moment format="DD.MM.YYYY hh:mm">{event.event_dates.starting_day}</Moment></td>
            <td>{event.location.address.street_address}</td>
            <td>
              {event.distance < 1000 ? 
                <p>{event.distance.toFixed(0)} m</p>
                : <p>{(event.distance/1000).toFixed(1)} km</p>
              }
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
export default EventsView
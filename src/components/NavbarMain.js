import React, { useState, useEffect } from 'react'
import { Navbar } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'


const NavbarMain = () => {
  return (
    <Navbar bg='dark' variant='dark' className='justify-content-center'>
      <Navbar.Brand>
        <FontAwesome
          name="map-signs"
          style={{ color: 'rgb(250,250,250)', marginRight: '10px' }}
        />
        Helsinki Event Map
      </Navbar.Brand>
    </Navbar>
  )
}

export default NavbarMain

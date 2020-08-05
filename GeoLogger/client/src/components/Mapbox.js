import React, { useRef, useState, useEffect } from 'react'
import { Container, Row } from 'reactstrap'
import mapboxgl from 'mapbox-gl'
import geoJSON from '../json/geoJSON.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw'

const Mapbox = () => {
  const mapContainerRef = useRef(null)

  const [state, setState] = useState({
    lng: -92,
    lat: 40,
    zoom: 3
  })

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [state.lng, state.lat],
      zoom: state.zoom
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on("moveend", () => {
      setState({
        ...state,
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

    geoJSON.regions.map(region => {
      const { source, visited, coordinates } = region
      if(visited) {
        map.on('load', function() {
          map.addSource(source, {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': coordinates
              }
            }
          })
          map.addLayer({
            'id': source,
            'type': 'fill',
            'source': source,
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.5
            }
          })
        })
      }
    })

    return () => map.remove()
  }, [])

  return (
    <Container>
      <Row className='justify-content-center'>
        <div className="sidebarStyle">
          <div>
            Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}
          </div>
        </div>
      </Row>
      <Row className='justify-content-center'>
        <div className="map-container" ref={mapContainerRef} />
      </Row>
    </Container>
  );
}

export default Mapbox

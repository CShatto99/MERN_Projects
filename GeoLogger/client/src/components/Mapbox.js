import React, { useRef, useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import mapboxgl from 'mapbox-gl'
import geoJSON from '../json/geoJSON.json'
import '../css/mapbox.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw'

const Mapbox = () => {
  const mapContainerRef = useRef(null)

  const [state, setState] = useState({
    lng: -92,
    lat: 40,
    zoom: 3,
    fillColor: ''
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
              'fill-color': state.fillColor,
              'fill-opacity': 0.5
            }
          })
        })
      }
    })

    return () => map.remove()
  }, [state])

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    setState({
      ...state,
      fillColor: ''
    })
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col sm={{size: 'auto'}}>
          <div className="sidebarStyle">
            <div>
              Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}
            </div>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <div className="map-container" ref={mapContainerRef} />
      </Row>
      <Row className='justify-content-center mt-3'>
        <Col sm={{size: 'auto'}} className='text-center'>
          <Form>
            <FormGroup>
              <Input
                onChange={e => onChange(e)}
                type='text' id='fillColor'
                name='fillColor'
                placeholder='Change Highlight'
                value={state.fillColor}
              />
            </FormGroup>
            <Button color='dark'>Submit</Button>
            <p className='text-light'>
              Click{' '}
              <a
                className='std-link'
                href='https://htmlcolorcodes.com/color-picker/'
                target='_blank'
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              for hex color codes
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Mapbox
